import { cn } from "@/lib/cn";

type Props = {
  tone?: "light" | "mist" | "ice";
  id?: string;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
};

const tones = {
  light: "bg-white",
  mist: "bg-mist",
  ice: "bg-ice",
};

export function Section({ tone = "light", id, className, children, labelledBy }: Props) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-20 text-ink md:py-28", tones[tone], className)}>
      <div className="container-x relative">{children}</div>
    </section>
  );
}

type TitleProps = {
  title: string;
  intro?: string;
  id?: string;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionTitle({ title, intro, id, as: H = "h2", className }: TitleProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <H id={id} className="t-h2">
        {title}
      </H>
      {intro && <p className="t-lead mt-5">{intro}</p>}
    </div>
  );
}
