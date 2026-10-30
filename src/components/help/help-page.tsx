"use client";

import { useState } from "react";
import { AccountShell } from "@/components/account/account-shell";
import type { HelpCategoryId } from "@/lib/help";
import { CategoryGrid } from "./category-grid";
import { ContactCard } from "./contact-card";
import { FaqList } from "./faq-list";
import { GameGuides } from "./game-guides";
import { HelpHero } from "./help-hero";

export function HelpPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<HelpCategoryId | null>(null);

  return (
    <AccountShell wide hero={<HelpHero query={query} onQuery={setQuery} />}>
      <CategoryGrid active={category} onChange={setCategory} />
      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <FaqList query={query} category={category} onReset={() => { setQuery(""); setCategory(null); }} />
        <ContactCard />
      </div>
      <GameGuides />
    </AccountShell>
  );
}
