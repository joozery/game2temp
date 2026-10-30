"use client";

import Image from "next/image";
import { useProfileAvatar } from "@/lib/profile-avatar";

export function ProfileAvatarImage({ alt, sizes = "96px", className = "object-cover object-top" }: { alt: string; sizes?: string; className?: string }) {
  const src = useProfileAvatar();
  return <Image src={src} alt={alt} fill sizes={sizes} unoptimized={src.startsWith("data:")} className={className} />;
}
