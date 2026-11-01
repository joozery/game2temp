"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, ChevronRight, Crown, Pencil, ShieldCheck } from "lucide-react";
import { ProfileAvatarImage } from "../profile-avatar-image";
import { user } from "@/lib/account";
import { useAccountProfile } from "@/lib/account-profile";

export function ProfileHero() {
  const accountProfile = useAccountProfile();
  return (
    <></>
  );
}
