import { Phone } from "lucide-react";
import Link from "next/link";
import { site } from "@/content/site";
import { waLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { WhatsAppIcon } from "./Icon";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-[var(--radius-btn)] px-5 py-3 text-[15px] font-semibold leading-none transition-colors duration-200 min-h-12";

export const btn = {
  whatsapp: cn(base, "bg-whatsapp text-[#05301a] hover:bg-[#1fc15c]"),
  teal: cn(base, "bg-teal-strong text-white hover:bg-teal-dark"),
  panel: cn(base, "bg-panel text-white hover:bg-teal-dark"),
  outline: cn(base, "border border-ink/20 bg-white text-ink hover:border-ink"),
  onDark: cn(base, "border border-white/55 text-white backdrop-blur-sm hover:bg-white hover:text-teal-dark"),
};

type WaProps = { message: string; location: string; label: string; className?: string; variant?: keyof typeof btn };

export function WhatsAppButton({ message, location, label, className, variant = "whatsapp" }: WaProps) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-track="whatsapp"
      data-location={location}
      className={cn(btn[variant], className)}
    >
      <WhatsAppIcon className="size-5 shrink-0" />
      {label}
    </a>
  );
}

type CallProps = { location: string; label?: string; className?: string; variant?: keyof typeof btn; note?: string };

export function CallButton({ location, label, className, variant = "outline", note }: CallProps) {
  return (
    <a href={site.phoneHref} data-track="phone" data-location={location} className={cn(btn[variant], className)} title={note}>
      <Phone className="size-[18px] shrink-0" aria-hidden />
      {label ?? site.phone}
    </a>
  );
}

/** Link de texto sublinhado (sem setas decorativas). */
export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("link", className)}>
      {children}
    </Link>
  );
}
