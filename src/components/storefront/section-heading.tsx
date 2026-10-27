import { ArrowRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function SectionHeading({
  title,
  subtitle,
  icon: Icon,
  href,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  href?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-3">
      <div className="flex items-center gap-3">
        {Icon && (
          <span className="grid size-10 place-items-center rounded-xl bg-primary text-ink">
            <Icon className="size-5" />
          </span>
        )}
        <div>
          <h2 className="text-xl font-semibold leading-tight sm:text-2xl">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {children && <div className="order-last w-full min-w-0 md:order-none md:w-auto">{children}</div>}
      {href && (
        <a
          href={href}
          className="ml-auto flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          ดูทั้งหมด <ArrowRight className="size-4" />
        </a>
      )}
    </div>
  );
}
