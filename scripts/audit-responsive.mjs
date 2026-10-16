import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const require = createRequire(import.meta.url);
const { chromium, webkit, devices } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.argv[2] || 'http://localhost:3000';
const output = process.argv[3] || 'outputs/responsive-audit';
await mkdir(output, { recursive: true });
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname);
for (const p of ['/terms', '/privacy']) if (!routes.includes(p)) routes.push(p);
if(process.env.ROUTES) routes.splice(0,routes.length,...process.env.ROUTES.split(','));
const chrome = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {}) });
const safari = await webkit.launch({ headless: true, ...(process.env.WEBKIT_EXECUTABLE ? { executablePath: process.env.WEBKIT_EXECUTABLE } : {}) });
const profiles = [
  { name:'desktop', browser:chrome, options:{viewport:{width:1440,height:1000}} },
  { name:'laptop', browser:chrome, options:{viewport:{width:1024,height:768}} },
  { name:'tablet', browser:safari, options:{...devices['iPad Mini']} },
  { name:'iphone-se', browser:safari, options:{...devices['iPhone SE']} },
  { name:'iphone-13', browser:safari, options:{...devices['iPhone 13']} },
  { name:'android-small', browser:chrome, options:{...devices['Pixel 7'],viewport:{width:360,height:800}} },
  { name:'android-pixel', browser:chrome, options:{...devices['Pixel 7']} },
  { name:'iphone-landscape', browser:safari, options:{...devices['iPhone 13 landscape']} },
];
const wanted = process.env.PROFILES?.split(',');
const selected = profiles.filter(p => !wanted || wanted.includes(p.name));
const results=[];
async function run(profile) {
  const context = await profile.browser.newContext({ ...profile.options, reducedMotion:'reduce', deviceScaleFactor:1 });
  // Keep this audit from sending synthetic analytics or loading third-party trackers.
  // WebKit upgrades HTTP localhost assets under production CSP. Strip only that
  // directive in the local test document; production HTTPS is tested unchanged.
  if(new URL(base).hostname === 'localhost') await context.route('**/*', async route => {
    if(route.request().resourceType() !== 'document') return route.continue();
    const response = await route.fetch();
    const headers = {...response.headers()};
    if(headers['content-security-policy']) headers['content-security-policy'] = headers['content-security-policy'].replace(/;?\s*upgrade-insecure-requests/g, '');
    await route.fulfill({response, headers});
  });
  await context.route('**/_vercel/**', r=>r.abort());
  await context.route(/google-analytics\.com|googletagmanager\.com|vitals\.vercel-insights\.com|va\.vercel-scripts\.com/, r=>r.abort());
  const page = await context.newPage();
  await mkdir(path.join(output, profile.name),{recursive:true});
  for (const route of routes) {
    const errors=[]; const failures=[];
    const onError=e=>errors.push(e.message);
    const onResponse=r=>{if(r.status()>=400 && new URL(r.url()).origin===new URL(base).origin) failures.push(`${r.status()} ${r.url()}`);};
    page.on('pageerror',onError); page.on('response',onResponse);
    try {
      const response=await page.goto(`${base}${route}`,{waitUntil:'networkidle',timeout:30000});
      await page.evaluate(()=>document.fonts.ready);
      { const font = await page.locator('body').evaluate(e=>getComputedStyle(e).fontFamily); if(!font.includes('Nunito')) throw new Error('Styles failed to load: '+font); }
      const height=await page.evaluate(()=>document.documentElement.scrollHeight);
      for(let y=0;y<height;y+=profile.options.viewport.height) {
        await page.evaluate(y=>window.scrollTo(0,y),y);
        await page.waitForTimeout(25);
      }
      await page.evaluate(()=>window.scrollTo(0,0));
      await page.waitForTimeout(80);
      const geometry=await page.evaluate(()=>{
        const visible=e=>{const r=e.getBoundingClientRect(); const s=getComputedStyle(e);return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none'&&!e.closest('[inert]');};
        const label=e=>(e.className?.toString()||e.tagName).slice(0,90);
        const overflow=[...document.querySelectorAll('main *,footer *,header *')].filter(visible).filter(e=>{const r=e.getBoundingClientRect();return r.left < -2 || r.right > innerWidth+2;}).filter(e=>!e.closest('.instagram-grid,.home-hero,.mobile-menu[aria-hidden="true"]')).slice(0,35).map(e=>({element:label(e),text:e.textContent.trim().slice(0,75),left:Math.round(e.getBoundingClientRect().left),right:Math.round(e.getBoundingClientRect().right)}));
        const clipped=[...document.querySelectorAll('h1,h2,h3,p,th,td,button,a.button')].filter(visible).filter(e=>e.scrollWidth>e.clientWidth+3 && getComputedStyle(e).overflowX!=='visible').map(e=>({element:label(e),text:e.textContent.trim().slice(0,100),scroll:e.scrollWidth,width:e.clientWidth}));
        const brokenImages=[...document.images].filter(e=>e.complete&&!e.naturalWidth).map(e=>e.getAttribute('src'));
        const badAnchors=[...document.querySelectorAll('a[href^="#"]')].map(e=>e.getAttribute('href')).filter(h=>h.length>1&&!document.getElementById(decodeURIComponent(h.slice(1))));
        const grids=[...document.querySelectorAll('main section, .service-overview-list, .booking-option-list, .membership-table-wrap, .catalogue-table-wrap')].filter(visible).flatMap(parent=>{
          if(getComputedStyle(parent).display!=='grid') return [];
          const children=[...parent.children].filter(visible);
          const overlaps=[];
          for(let i=0;i<children.length;i++)for(let j=i+1;j<children.length;j++){
            const a=children[i].getBoundingClientRect(),b=children[j].getBoundingClientRect();
            if(Math.min(a.right,b.right)-Math.max(a.left,b.left)>4&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>4)overlaps.push({parent:label(parent),a:label(children[i]),b:label(children[j])});
          }return overlaps;
        });
        const alignment=[];
        for(const e of document.querySelectorAll('.site-footer > .offering-links,.booking-chooser > .offering-links,.service-overview-list')) {
          if(!visible(e))continue;const parent=e.parentElement,r=e.getBoundingClientRect(),p=parent.getBoundingClientRect(),style=getComputedStyle(parent);
          const left=p.left+parseFloat(style.paddingLeft),right=p.right-parseFloat(style.paddingRight);
          if(Math.abs(r.left-left)>2||Math.abs(r.right-right)>2)alignment.push({element:label(e),left:r.left,right:r.right,expectedLeft:left,expectedRight:right});
        }
        return {width:innerWidth,documentWidth:document.documentElement.scrollWidth,overflow,clipped,brokenImages,badAnchors,gridOverlaps:grids,alignment,h1Count:document.querySelectorAll('h1').length};
      });
      const file=route==='/'?'home':route.slice(1).replaceAll('/','--');
      await page.screenshot({path:path.join(output,profile.name,`${file}.png`),fullPage:true,animations:'disabled'});
      const row={profile:profile.name,route,status:response.status(),...geometry,errors,failures};results.push(row);
      const issues=row.overflow.length+row.clipped.length+row.brokenImages.length+row.badAnchors.length+row.gridOverlaps.length+row.errors.length+row.failures.length+row.alignment.length+(row.documentWidth>row.width+2?1:0);
      console.log(JSON.stringify({profile:profile.name,route,issues,...(issues?{overflow:row.overflow,clipped:row.clipped,gridOverlaps:row.gridOverlaps,alignment:row.alignment,errors,failures,brokenImages:row.brokenImages,badAnchors:row.badAnchors}: {})}));
    }catch(error){results.push({profile:profile.name,route,error:String(error)});console.log(JSON.stringify({profile:profile.name,route,error:String(error)}));}
    page.removeListener('pageerror',onError); page.removeListener('response',onResponse);
  }
  await context.close();
}
try {
  // Two profiles at a time to keep memory use bounded on the user's computer.
  for(let i=0;i<selected.length;i+=2)await Promise.all(selected.slice(i,i+2).map(run));
  const issueRows=results.filter(r=>r.error||r.status!==200||r.documentWidth>r.width+2||['overflow','clipped','brokenImages','badAnchors','gridOverlaps','alignment','errors','failures'].some(k=>r[k]?.length));
  const summary={base,routes:routes.length,profiles:selected.map(p=>p.name),pageChecks:results.length,issueRows:issueRows.length,result:issueRows.length?'FAIL':'PASS',engines:{chromium:chrome.version(),webkit:safari.version()}};
  await writeFile(path.join(output,'results.json'),JSON.stringify({...summary,results},null,2));
  console.log(JSON.stringify(summary));
  if(issueRows.length)process.exitCode=1;
}finally{await chrome.close();await safari.close();}
