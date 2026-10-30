import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginView } from "@/components/auth/login-view";

export const metadata: Metadata = { title: "เข้าสู่ระบบ — PK-TOPUP" };

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

async function LoginForm({ searchParams }: { searchParams: SearchParams }) {
  const { mode, next, ref } = await searchParams;
  return <LoginView initialMode={mode === "register" ? "register" : "login"} next={typeof next === "string" ? next : undefined} refCode={typeof ref === "string" ? ref : undefined} />;
}

export default function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  return <Suspense><LoginForm searchParams={searchParams} /></Suspense>;
}
