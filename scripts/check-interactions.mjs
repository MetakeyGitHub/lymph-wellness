import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
const require=createRequire(import.meta.url);
const {chromium,webkit,devices}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const {expect}=require((process.env.PLAYWRIGHT_MODULE||'playwright')+'/test');
const base=process.argv[2]||'http://localhost:3000';
const output=process.argv[3]||'outputs/interaction-audit';
await mkdir(output,{recursive:true});
const chromiumBrowser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE}:{})});
const webkitBrowser=await webkit.launch({headless:true,...(process.env.WEBKIT_EXECUTABLE?{executablePath:process.env.WEBKIT_EXECUTABLE}:{})});
const profiles=[
 ['desktop',chromiumBrowser,{viewport:{width:1440,height:1000}}],
 ['laptop',chromiumBrowser,{viewport:{width:1024,height:768}}],
 ['tablet',webkitBrowser,{...devices['iPad Mini']}],
 ['iphone-se',webkitBrowser,{...devices['iPhone SE']}],
 ['iphone-13',webkitBrowser,{...devices['iPhone 13']}],
 ['android-small',chromiumBrowser,{...devices['Pixel 7'],viewport:{width:360,height:800}}],
 ['android-pixel',chromiumBrowser,{...devices['Pixel 7']}],
 ['iphone-landscape',webkitBrowser,{...devices['iPhone 13 landscape']}],
];
const results=[];
try{for(const [name,browser,options]of profiles){
 const context=await browser.newContext({...options,deviceScaleFactor:1});
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
  await context.route(/google-analytics\.com|googletagmanager\.com|vitals\.vercel-insights\.com|va\.vercel-scripts\.com/,r=>r.abort());
 const page=await context.newPage();
 const checks=[];
 async function check(label,fn){try{await fn();checks.push({check:label,status:'PASS'});}catch(e){checks.push({check:label,status:'FAIL',message:String(e)});}}
 await page.goto(`${base}/services`,{waitUntil:'networkidle'});
 await check('header navigation fits without overlaps',async()=>{
   const overlap=await page.locator('.site-header').evaluate(header=>{
    const children=[...header.children].filter(e=>!e.classList.contains('mobile-menu')).filter(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width&&r.height&&s.display!=='none'});
    const pairs=[];for(let i=0;i<children.length;i++)for(let j=i+1;j<children.length;j++){const a=children[i].getBoundingClientRect(),b=children[j].getBoundingClientRect();if(Math.min(a.right,b.right)-Math.max(a.left,b.left)>2&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>2)pairs.push([children[i].className,children[j].className]);}return pairs;});
   assert.deepEqual(overlap,[]);
 });
 const menu=page.getByRole('button',{name:'Open menu',exact:true});
 if(await menu.isVisible()){
  await check('mobile menu opens, scrolls and closes with Escape',async()=>{
   await menu.click();await page.getByRole('button',{name:'Close menu',exact:true}).waitFor();
   assert.equal(await page.locator('.mobile-menu').getAttribute('aria-hidden'),'false');
   await page.locator('.mobile-menu-book').scrollIntoViewIfNeeded();assert(await page.locator('.mobile-menu-book').isVisible());
   await page.keyboard.press('Escape');assert.equal(await page.locator('.mobile-menu').getAttribute('aria-hidden'),'true');
  });
  await check('mobile navigation changes route and releases scroll lock',async()=>{
   await page.getByRole('button',{name:'Open menu',exact:true}).click();
   await page.getByRole('navigation',{name:'Mobile navigation',exact:true}).getByRole('link',{name:/Memberships/}).click();
   await page.waitForURL('**/memberships');assert.equal(await page.locator('body').evaluate(e=>e.classList.contains('menu-open')),false);
   assert(await page.getByRole('heading',{level:1}).isVisible());
  });
 }
 await page.goto(`${base}/services`,{waitUntil:'networkidle'});
 await check('service index spans section and rows align',async()=>{
   if(await page.locator('.service-overview').isVisible()){
    const boxes=await page.evaluate(()=>{const section=document.querySelector('.service-overview'),list=document.querySelector('.service-overview-list');const style=getComputedStyle(section),s=section.getBoundingClientRect(),l=list.getBoundingClientRect();return{expected:s.width-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight),actual:l.width,rows:[...list.children].map(e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right,children:[...e.children].map(c=>{const q=c.getBoundingClientRect();return {left:q.left,right:q.right}})}})}});
    assert(Math.abs(boxes.expected-boxes.actual)<2,JSON.stringify(boxes));
    assert(boxes.rows.every(r=>r.children.every(c=>c.left>=r.left-1&&c.right<=r.right+1)),JSON.stringify(boxes));
    await page.locator('.service-overview').scrollIntoViewIfNeeded();
    await expect(page.locator('.service-overview')).toHaveCSS('opacity','1');
    await page.locator('.service-overview').evaluate(e=>window.scrollTo({top:e.getBoundingClientRect().top+window.scrollY-96,behavior:'instant'}));
    await page.screenshot({path:`${output}/${name}-service-index.png`,animations:'disabled'});
    await page.locator('.service-overview-list a').first().click();assert(new URL(page.url()).hash==='#lymphatic-drainage');
   } else {assert(await page.locator('.service-mobile-cards').isVisible());}
 });
 await check('every service category expands and shows its table',async()=>{
   for(const details of await page.locator('.catalogue-group').all()){
    if(await details.getAttribute('open')===null)await details.locator('summary').click();
    assert(await details.locator('table').isVisible());assert(await details.locator('tbody tr').count()>0);
    const overflow=await details.locator('th,td').evaluateAll(es=>es.filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.left < -1||r.right>innerWidth+1)}).map(e=>e.textContent));assert.deepEqual(overflow,[]);
   }
 });
 await check('all service booking links use the exact approved URL',async()=>{
   const urls=await page.locator('main a[href*="/webstoreNew/services/"]').evaluateAll(es=>es.map(e=>e.href));
   assert(urls.length>=43);assert(urls.every(h=>h==='https://lymphwell.ap.zenoti.com/webstoreNew/services/ab0f43de-2383-47ca-b282-967daa002f72'));
 });
 await page.goto(`${base}/faq`,{waitUntil:'networkidle'});
 await check('every FAQ expands and collapses',async()=>{
  for(const details of await page.locator('.accordion details').all()){await details.locator('summary').click();assert(await details.locator('.accordion-answer').isVisible());await details.locator('summary').click();assert.equal(await details.getAttribute('open'),null);}
 });
 await page.goto(`${base}/contact`,{waitUntil:'networkidle'});
 await check('enquiry form validates and accepts touch-friendly input',async()=>{
  assert.equal(await page.locator('form').evaluate(f=>f.checkValidity()),false);
  await page.getByLabel('Name',{exact:true}).fill('Launch QA');await page.getByLabel('Email',{exact:true}).fill('qa@example.com');await page.getByLabel('How can we help?',{exact:true}).fill('Browser verification only.');
  assert.equal(await page.locator('form').evaluate(f=>f.checkValidity()),true);
  const sizes=await page.locator('input,select,textarea').evaluateAll(es=>es.map(e=>parseFloat(getComputedStyle(e).fontSize)));
  assert(sizes.every(s=>s>=16),'Inputs smaller than 16px can trigger iPhone zoom');
 });
 await page.goto(base,{waitUntil:'networkidle'});
 await check('review carousel next, previous and dot controls work',async()=>{
  await page.getByRole('button',{name:'Show next review',exact:true}).click();await expect(page.locator('.testimonial-controls > p')).toContainText('Review 2');
  await page.getByRole('button',{name:'Show previous review',exact:true}).click();await expect(page.locator('.testimonial-controls > p')).toContainText('Review 1');
  await page.getByRole('button',{name:/Show review 3 from/}).click();await expect(page.locator('.testimonial-controls > p')).toContainText('Review 3');
 });
 await check('normal-motion scrolling reveals content',async()=>{
  await page.locator('.site-footer').scrollIntoViewIfNeeded();
  await page.locator('.testimonials').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await expect(page.locator('.testimonials')).toHaveClass(/is-visible/);
 });
 results.push({profile:name,checks});console.log(JSON.stringify(results.at(-1)));await context.close();
}}finally{await chromiumBrowser.close();await webkitBrowser.close();}
await writeFile(`${output}/results.json`,JSON.stringify({base,results},null,2));
if(results.some(r=>r.checks.some(c=>c.status==='FAIL')))process.exitCode=1;
