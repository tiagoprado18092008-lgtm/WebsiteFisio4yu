/** Percurso numerado (é uma sequência real): título fixo à esquerda, passos numa linha vertical à direita. */
export function JourneySteps({ title, intro, steps, id }: { title: string; intro?: string; steps: { title: string; text: string }[]; id: string }) {
  return (
    <div className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:gap-16">
      <div className="md:sticky md:top-32 md:self-start">
        <h2 id={id} className="t-h2">
          {title}
        </h2>
        {intro && <p className="t-lead mt-5 max-w-md">{intro}</p>}
      </div>
      <ol className="relative">
        {steps.map((s, i) => (
          <li key={s.title} className="relative grid grid-cols-[3rem_1fr] gap-5 pb-10 last:pb-0">
            {i < steps.length - 1 && <span aria-hidden className="absolute left-6 top-12 h-[calc(100%-3rem)] w-px bg-line" />}
            <span className="flex size-12 items-center justify-center rounded-full border border-teal/40 bg-white font-display text-lg font-medium text-teal-strong">
              {i + 1}
            </span>
            <div className="pt-2.5">
              <h3 className="t-h3">{s.title}</h3>
              <p className="mt-2 max-w-md text-grey">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
