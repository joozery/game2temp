import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AccountShell } from "@/components/account/account-shell";
import { BoxPlay } from "@/components/boxes/box-play";
import { boxes } from "@/lib/boxes";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return boxes.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const box = boxes.find((b) => b.id === id);
  return box ? { title: `${box.name} — PK-TOPUP`, description: box.tagline } : {};
}

export default async function BoxPage({ params }: Props) {
  const { id } = await params;
  const box = boxes.find((b) => b.id === id);
  if (!box) notFound();
  return (
    <AccountShell wide>
      <BoxPlay box={box} />
    </AccountShell>
  );
}
