import { clinicFilms, type ClinicFilmKey } from "../_data/clinic-media";

export function ClinicFilm({ clip }: { clip: ClinicFilmKey }) {
  const film = clinicFilms[clip];
  const captionId = `clinic-film-${clip}`;
  return (
    <figure className="lw-clinic-film">
      <video
        controls
        playsInline
        muted
        preload="none"
        width={720}
        height={1280}
        poster={`/images/clinic/${film.file}-poster.webp`}
        aria-label={film.title}
        aria-describedby={captionId}
      >
        <source src={`/videos/clinic/${film.file}.mp4`} type="video/mp4" />
        <p>
          <a href={`/videos/clinic/${film.file}.mp4`}>Watch {film.title.toLowerCase()}</a>
        </p>
      </video>
      <figcaption id={captionId}>
        <span className="lw-film-label">Play a little glimpse · {film.seconds} sec · Silent film</span>
        <span>{film.description}</span>
      </figcaption>
    </figure>
  );
}
