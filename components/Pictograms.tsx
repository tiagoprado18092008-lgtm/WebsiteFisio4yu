/**
 * Pictogramas da Fisio4you: forma principal sólida (currentColor) com um acento no gradiente teal→ciano do "4".
 * Cada um aparece uma vez por página, por isso os ids dos gradientes são fixos.
 */
export type PictogramName = "eco" | "gym" | "ice" | "postnatal";

function Accent({ id }: { id: string }) {
  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="10" y1="8" x2="54" y2="58">
      <stop offset="0" style={{ stopColor: "var(--f4y-teal)" }} />
      <stop offset="1" style={{ stopColor: "var(--f4y-cyan)" }} />
    </linearGradient>
  );
}

export function Pictogram({ name, className }: { name: PictogramName; className?: string }) {
  const id = `pg-${name}`;
  const accent = `url(#${id})`;
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <Accent id={id} />
      </defs>
      {name === "eco" && (
        // Sonda ecográfica a emitir ondas
        <>
          <path d="M32 8V5q0-3 4-3h6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M28 8h8a3 3 0 0 1 3 3v8l7 7v4q-14 4.5-28 0v-4l7-7v-8a3 3 0 0 1 3-3z" fill="currentColor" />
          <path d="M29.5 14h5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
          <g fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round">
            <path d="M21.5 35.4A17 17 0 0 0 42.5 35.4" />
            <path d="M16.6 41.7A25 25 0 0 0 47.4 41.7" opacity=".7" />
            <path d="M11.7 48A33 33 0 0 0 52.3 48" opacity=".45" />
          </g>
        </>
      )}
      {name === "gym" && (
        // Kettlebell
        <>
          <path d="M18.5 33V19a7 7 0 0 1 7-7h13a7 7 0 0 1 7 7v14" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M24 54a17 17 0 1 1 16 0z" fill={accent} />
          <path d="M21.5 37a11.5 11.5 0 0 1 6.5-7.5" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="2.6" strokeLinecap="round" />
        </>
      )}
      {name === "ice" && (
        // Banheira com cubos de gelo
        <>
          <rect x="16.5" y="13.5" width="14" height="14" rx="3.2" fill={accent} transform="rotate(-14 23.5 20.5)" />
          <rect x="33" y="16.5" width="12.5" height="12.5" rx="3" fill={accent} transform="rotate(12 39.25 22.75)" />
          <path d="M20.5 17.5l3.5-.9M36.5 20.4l2.8.6" stroke="#fff" strokeOpacity=".7" strokeWidth="1.8" strokeLinecap="round" />
          <rect x="5" y="28" width="54" height="6" rx="3" fill="currentColor" />
          <path d="M9 36.5h46v3.5a13 13 0 0 1-13 13H22A13 13 0 0 1 9 40z" fill="currentColor" />
          <path d="M15 42q4.5-3 9 0t9 0t9 0t9 0" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 53l-2 4.5M46 53l2 4.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </>
      )}
      {name === "postnatal" && (
        // Mãe com o bebé ao colo
        <>
          <circle cx="25" cy="12" r="7.5" fill="currentColor" />
          <path d="M9 58V37a14 14 0 0 1 14-14h4a14 14 0 0 1 14 14v21z" fill="currentColor" />
          <g fill={accent} stroke="#fff" strokeWidth="3" paintOrder="stroke">
            <ellipse cx="33" cy="41" rx="12.5" ry="7.5" transform="rotate(-22 33 41)" />
            <circle cx="47.5" cy="30.5" r="6.2" />
          </g>
          <path d="M15 43q8 11 27 4" fill="none" stroke="#fff" strokeWidth="8.5" strokeLinecap="round" />
          <path d="M15 43q8 11 27 4" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
