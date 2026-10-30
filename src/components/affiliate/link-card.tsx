"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Copy, Link2, ShieldAlert } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { agent } from "@/lib/affiliate";

const subscribe = () => () => {};

export function LinkCard() {
  const origin = useSyncExternalStore(subscribe, () => window.location.origin, () => "");
  const [copied, setCopied] = useState(false);
  const link = `${origin}/login?mode=register&ref=${agent.code}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the link is still selectable in the field.
    }
  }

  return (
    <Card>
      <CardTitle icon={Link2} title="ลิงก์แนะนำของคุณ" />
      <div className="flex flex-col gap-2 sm:flex-row">
        <input readOnly value={link} aria-label="ลิงก์แนะนำ" onFocus={(e) => e.currentTarget.select()} className="h-11 min-w-0 flex-1 rounded-xl border border-border bg-muted/50 px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
        <button onClick={copy} className="shine inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-ink transition hover:bg-primary-hover">
          {copied ? <><Check className="size-4" /> คัดลอกแล้ว</> : <><Copy className="size-4" /> คัดลอกลิงก์</>}
        </button>
      </div>
      <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
        <ShieldAlert className="mt-0.5 size-3.5 shrink-0" />
        หนึ่งบัญชีผูกกับผู้แนะนำได้เพียงหนึ่งรายเท่านั้น และไม่สามารถแนะนำตัวเองหรือสร้างสายแนะนำที่วนซ้ำได้ การสมัครสมาชิกอย่างเดียวไม่ก่อให้เกิดค่าคอมมิชชัน
      </p>
    </Card>
  );
}
