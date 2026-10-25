"use client";

import { useState } from "react";
import { CheckCircle2, Gem } from "lucide-react";
import type { Game } from "@/lib/games";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioCard, RadioGroup } from "@/components/ui/radio-group";

const payments = [
  { id: "promptpay", label: "PromptPay" },
  { id: "truemoney", label: "TrueMoney" },
  { id: "card", label: "บัตรเครดิต" },
];

const baht = (n: number) => `฿${n.toLocaleString("th-TH")}`;

export function TopupDialog({
  game,
  open,
  onOpenChange,
}: {
  game: Game;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [playerId, setPlayerId] = useState("");
  const [packageId, setPackageId] = useState(game.packages[1]?.id ?? game.packages[0].id);
  const [payment, setPayment] = useState(payments[0].id);
  const [done, setDone] = useState(false);

  const selected = game.packages.find((p) => p.id === packageId)!;
  const needsId = game.category !== "card";

  const handleOpenChange = (next: boolean) => {
    if (!next) setDone(false);
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        {done ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto size-14 text-emerald-400" />
            <DialogTitle className="mt-4 text-xl">บันทึกตัวอย่างคำสั่งซื้อแล้ว</DialogTitle>
            <DialogDescription className="mt-2">
              {selected.amount.toLocaleString()} {game.currency} สำหรับ {game.name}
              {needsId && ` (ID: ${playerId})`} — นี่คือตัวอย่าง UI ยังไม่มีการชำระเงินหรือส่งไอเทมจริง
            </DialogDescription>
            <Button className="mt-6 w-full" onClick={() => handleOpenChange(false)}>
              ตกลง
            </Button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <div className="flex items-center gap-3 pr-8">
              <div
                className={`grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${game.gradient} text-lg font-bold`}
              >
                {game.name.slice(0, 2)}
              </div>
              <div>
                <DialogTitle>เติม {game.name}</DialogTitle>
                <DialogDescription>{game.publisher}</DialogDescription>
              </div>
            </div>

            {needsId && (
              <div className="mt-6">
                <label htmlFor="player-id" className="mb-2 block text-sm font-medium">
                  1. กรอก Player ID
                </label>
                <Input
                  id="player-id"
                  required
                  placeholder="เช่น 123456789"
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                />
              </div>
            )}

            <p className="mb-2 mt-6 text-sm font-medium">{needsId ? "2." : "1."} เลือกแพ็กเกจ</p>
            <RadioGroup value={packageId} onValueChange={setPackageId} className="grid-cols-2 sm:grid-cols-3">
              {game.packages.map((pkg) => (
                <RadioCard key={pkg.id} value={pkg.id}>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Gem className="size-4 text-amber-500" />
                    {pkg.amount.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">{game.currency}</p>
                  {pkg.bonus && (
                    <span className="absolute right-2 top-2 rounded-md bg-emerald-500/15 px-1.5 text-[10px] font-semibold text-emerald-400">
                      +{pkg.bonus}
                    </span>
                  )}
                  <p className="mt-2 text-sm font-bold">{baht(pkg.price)}</p>
                </RadioCard>
              ))}
            </RadioGroup>

            <p className="mb-2 mt-6 text-sm font-medium">{needsId ? "3." : "2."} ช่องทางชำระเงิน</p>
            <RadioGroup value={payment} onValueChange={setPayment} className="grid-cols-3">
              {payments.map((p) => (
                <RadioCard key={p.id} value={p.id} className="py-2.5 text-center text-sm font-medium">
                  {p.label}
                </RadioCard>
              ))}
            </RadioGroup>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-muted/60 px-4 py-3">
              <span className="text-sm text-muted-foreground">ยอดชำระ</span>
              <span className="text-xl font-bold">{baht(selected.price)}</span>
            </div>
            <Button type="submit" size="lg" className="mt-4 w-full">
              ชำระเงิน
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
