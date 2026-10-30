"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Headphones, Loader2, LockKeyhole, Mail, ShieldCheck, User, Zap } from "lucide-react";
import { Brand } from "@/components/storefront/sidebar";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { saveAccountProfile, defaultAccountProfile } from "@/lib/account-profile";
import { recordReferrer } from "@/lib/affiliate";
import { safeNext, signIn } from "@/lib/auth";

type Mode = "login" | "register";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const perks = [
  { icon: Zap, title: "เติมไว ไม่ต้องรอนาน", text: "ระบบอัตโนมัติ 24 ชั่วโมง" },
  { icon: ShieldCheck, title: "ปลอดภัย 100%", text: "ข้อมูลของคุณปลอดภัย" },
  { icon: Headphones, title: "ทีมงานดูแลตลอด", text: "พร้อมช่วยเหลือทุกปัญหา" },
];

const socialProviders = [
  { name: "Google", icon: "/icons/social/google.svg" },
  { name: "LINE", icon: "/icons/social/line.svg" },
  { name: "Facebook", icon: "/icons/social/facebook.svg" },
];

const inputClass = "login-input h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/30";

export function LoginView({ initialMode, next, refCode }: { initialMode: Mode; next?: string; refCode?: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [socialInfo, setSocialInfo] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const register = mode === "register";

  function switchMode(value: Mode) {
    setMode(value);
    setError("");
  }

  function validate() {
    if (register && !name.trim()) return "กรุณากรอกชื่อที่ใช้แสดง";
    if (register ? !emailPattern.test(email.trim()) : !email.trim() || (!emailPattern.test(email.trim()) && !/^[a-zA-Z0-9_]{3,32}$/.test(email.trim()))) return register ? "กรุณากรอกอีเมลให้ถูกต้อง" : "กรุณากรอกอีเมลหรือชื่อผู้ใช้ให้ถูกต้อง";
    if (password.length < 6) return "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
    if (register && password !== confirm) return "รหัสผ่านยืนยันไม่ตรงกัน";
    return "";
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const problem = validate();
    if (problem) return setError(problem);
    setError("");
    setLoading(true);
    // Sample flow: any well-formed credentials are accepted after a short delay.
    window.setTimeout(() => {
      if (register && refCode) recordReferrer(refCode);
      if (register) saveAccountProfile({ ...defaultAccountProfile, name: name.trim(), email: email.trim() });
      signIn(remember);
      router.replace(safeNext(next));
    }, 700);
  }

  return (
    <main className="grid min-h-screen bg-[#fffaf0] lg:grid-cols-[58%_42%]">
      <aside className="relative hidden min-h-screen overflow-hidden bg-[#0b1222] text-white lg:block">
        <Image src="/images/login-hero-art.png" alt="" fill priority sizes="58vw" className="object-cover object-center" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,11,24,.68)_0%,rgba(5,11,24,.35)_48%,transparent_85%),linear-gradient(0deg,rgba(5,11,24,.35),transparent_45%)]" />
        <div className="relative z-10 flex min-h-screen flex-col px-8 py-8 xl:px-12 xl:py-10">
          <div className="w-44 drop-shadow-[0_2px_8px_rgba(255,255,255,.75)] xl:w-52"><Brand /></div>
          <div className="mt-12 max-w-[530px] xl:mt-14">
            <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight xl:text-6xl">เติมเกมง่าย<br /><span className="text-primary">สนุกได้มากกว่า</span></h2>
            <p className="mt-5 max-w-[450px] text-base leading-relaxed text-white/85 xl:text-lg">เกมไหนก็เติมได้ ราคาดี ปลอดภัย 100%<br />พร้อมดูแลคุณตลอด 24 ชั่วโมง</p>
            <ul className="mt-8 space-y-4">
              {perks.map(({ icon: Icon, title, text }) => <li key={title} className="flex items-center gap-3"><span className="grid size-11 shrink-0 place-items-center rounded-full border border-primary/60 bg-black/35 text-primary shadow-[0_0_20px_rgba(255,213,79,.12)]"><Icon className="size-5" /></span><span><span className="block text-sm font-bold xl:text-base">{title}</span><span className="block text-xs text-white/70 xl:text-sm">{text}</span></span></li>)}
            </ul>
          </div>
        </div>
        <Image src="/images/profile-mascot.png" alt="" width={1200} height={1200} className="pointer-events-none absolute bottom-[12%] right-[-7%] z-[5] w-[340px] drop-shadow-[0_18px_25px_rgba(0,0,0,.35)] xl:bottom-[11%] xl:right-[-5%] xl:w-[460px]" />
      </aside>

      <section className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(circle_at_8%_12%,#fff1bd_0,transparent_28%),linear-gradient(135deg,#fffdf8,#fffaf0_70%,#fff5da)] px-4 pb-20 pt-5 sm:px-8 lg:px-7 lg:pb-8 xl:px-10">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-28 size-80 rotate-45 rounded-3xl border border-amber-200/70" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-24 size-80 rotate-45 rounded-3xl border border-amber-200/70" />
        <div className="relative z-10 mx-auto flex w-full max-w-[560px] items-center justify-between">
          <div className="w-36 lg:hidden"><Brand /></div>
          <p className="ml-auto text-xs text-slate-500 sm:text-sm">{register ? "มีบัญชีอยู่แล้ว?" : "ยังไม่มีบัญชี?"} <button type="button" onClick={() => switchMode(register ? "login" : "register")} className="ml-1 font-bold text-amber-600 transition hover:text-amber-700">{register ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}</button></p>
        </div>

        <div className="relative z-10 mx-auto my-auto w-full max-w-[560px] py-8 lg:py-12">
          <div className="rounded-3xl border border-white/90 bg-white/95 px-5 py-8 shadow-[0_25px_65px_-28px_rgba(104,79,25,.25)] sm:px-8 sm:py-10 xl:px-10 xl:py-12">
            <div className="mx-auto hidden w-52 lg:block"><Brand /></div>
            <h1 className="mt-1 text-center text-3xl font-extrabold text-ink lg:mt-8">{register ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}</h1>
            <p className="mt-1 text-center text-sm text-slate-500">{register ? "สมัครฟรี เพื่อเริ่มเติมเกมและรับสิทธิพิเศษ" : "เข้าสู่ระบบเพื่อเริ่มเติมเกม และใช้บริการทั้งหมด"}</p>
            {register && refCode && <p className="mt-5 rounded-xl bg-primary/20 px-4 py-2.5 text-sm">สมัครผ่านลิงก์แนะนำของรหัส <b>{refCode.toUpperCase()}</b></p>}

            <form onSubmit={submit} noValidate className="mt-8 space-y-4">
              {register && <label className="relative block"><span className="sr-only">ชื่อที่ใช้แสดง</span><User className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" /><input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="ชื่อที่ใช้แสดง" className={inputClass} /></label>}
              <label className="relative block"><span className="sr-only">{register ? "อีเมล" : "อีเมลหรือชื่อผู้ใช้"}</span><Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" /><input type={register ? "email" : "text"} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete={register ? "email" : "username"} placeholder={register ? "อีเมล" : "อีเมล หรือ ชื่อผู้ใช้"} className={inputClass} /></label>
              <label className="relative block"><span className="sr-only">รหัสผ่าน</span><LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" /><input type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={register ? "new-password" : "current-password"} placeholder="รหัสผ่าน" className={`${inputClass} pr-12`} /><button type="button" onClick={() => setShow((v) => !v)} aria-label={show ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"} className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-muted hover:text-ink">{show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}</button></label>
              {register && <label className="relative block"><span className="sr-only">ยืนยันรหัสผ่าน</span><LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" /><input type={show ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" placeholder="ยืนยันรหัสผ่าน" className={inputClass} /></label>}
              {!register && <div className="flex items-center justify-between gap-2 text-xs sm:text-sm"><label className="inline-flex cursor-pointer items-center gap-2 text-slate-500"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="size-4 accent-amber-400" />จดจำฉันไว้ในระบบ</label><button type="button" onClick={() => { setForgotOpen(true); setForgotSent(false); }} className="font-semibold text-amber-600 transition hover:text-amber-700">ลืมรหัสผ่าน?</button></div>}
              {error && <p role="alert" className="rounded-xl border border-coral/30 bg-coral/10 px-3.5 py-2.5 text-sm text-coral">{error}</p>}
              <button type="submit" disabled={loading} className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-primary text-base font-bold text-ink shadow-[0_8px_20px_-10px_rgba(255,170,0,.7)] transition hover:bg-primary-hover disabled:opacity-70">{loading && <Loader2 className="size-4 animate-spin" />}{loading ? "กำลังดำเนินการ..." : register ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}{!loading && <ArrowRight className="size-5" />}</button>
            </form>

            {!register && <><div className="my-6 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200" />หรือเข้าสู่ระบบด้วย<span className="h-px flex-1 bg-slate-200" /></div><div className="grid grid-cols-3 gap-2">{socialProviders.map((provider) => <button key={provider.name} type="button" onClick={() => setSocialInfo(provider.name)} className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-ink transition hover:-translate-y-0.5 hover:border-primary hover:shadow-sm sm:text-sm"><Image src={provider.icon} alt="" width={20} height={20} className="size-5 shrink-0" /><span>{provider.name}</span></button>)}</div></>}

            <div className="mt-6 flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-600"><ShieldCheck className="size-6" /></span><span><span className="block text-sm font-bold text-ink">ปลอดภัย 100%</span><span className="block text-[11px] text-slate-500">ข้อมูลของคุณถูกเก็บรักษาอย่างปลอดภัย</span></span></div>
            <p className="mt-4 text-center text-[11px] text-slate-400">โหมดตัวอย่าง · ระบบยังไม่ได้เชื่อมต่อเซิร์ฟเวอร์จริง</p>
          </div>
        </div>
      </section>

      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}><DialogContent><DialogTitle>ลืมรหัสผ่าน?</DialogTitle><DialogDescription>กรอกอีเมลเพื่อทดลองขั้นตอนกู้คืนบัญชี</DialogDescription>{forgotSent ? <p role="status" className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">แสดงขั้นตอนตัวอย่างแล้ว · ยังไม่มีการส่งอีเมลจริง</p> : <form onSubmit={(event) => { event.preventDefault(); setForgotSent(true); }} className="mt-5 space-y-3"><label className="block text-xs font-semibold">อีเมล<input required type="email" defaultValue={email} placeholder="you@example.com" className="mt-1.5 h-11 w-full rounded-xl border border-border px-3 text-sm outline-none focus:border-primary" /></label><button type="submit" className="h-11 w-full rounded-xl bg-primary text-sm font-bold text-ink">ดูขั้นตอนกู้คืน</button></form>}</DialogContent></Dialog>
      <Dialog open={socialInfo !== null} onOpenChange={(open) => { if (!open) setSocialInfo(null); }}><DialogContent><DialogTitle>เข้าสู่ระบบด้วย {socialInfo}</DialogTitle><DialogDescription>ตัวเลือกนี้เป็น UI ตัวอย่าง ยังไม่ได้เชื่อมต่อการเข้าสู่ระบบด้วย {socialInfo}</DialogDescription><button type="button" onClick={() => setSocialInfo(null)} className="mt-5 h-10 w-full rounded-xl bg-primary text-sm font-bold text-ink">เข้าใจแล้ว</button></DialogContent></Dialog>
    </main>
  );
}
