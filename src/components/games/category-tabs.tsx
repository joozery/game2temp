import { catalogCategories, type CatalogCategory } from "@/lib/game-catalog";
import { cn } from "@/lib/utils";

export function CategoryTabs({ active, onChange }: { active: CatalogCategory; onChange: (c: CatalogCategory) => void }) {
  return (
    <nav aria-label="หมวดหมู่เกม" className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
      {catalogCategories.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          aria-pressed={active === id}
          className={cn(
            "inline-flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border px-4 text-sm font-semibold transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:flex-1",
            active === id ? "border-primary bg-primary text-ink shadow-sm" : "border-border bg-card"
          )}
        >
          <Icon className={cn("size-5", active !== id && id === "popular" && "text-coral", active !== id && id === "promo" && "text-coral")} /> {label}
        </button>
      ))}
    </nav>
  );
}
