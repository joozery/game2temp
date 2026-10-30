"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { Camera, Check, UploadCloud, UserRound } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ProfileAvatarImage } from "@/components/account/profile-avatar-image";
import { user } from "@/lib/account";
import { saveAccountProfile, useAccountProfile, type AccountProfile } from "@/lib/account-profile";
import { saveProfileAvatar, useProfileAvatar } from "@/lib/profile-avatar";

export function ProfileForm() {
  const storedProfile = useAccountProfile();
  const [draft, setDraft] = useState<AccountProfile | null>(null);
  const profile = draft ?? storedProfile;
  const avatar = useProfileAvatar();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [profileError, setProfileError] = useState("");
  const [saved, setSaved] = useState(false);

  async function chooseAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = "";
    if (!["image/jpeg", "image/png"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setUploadError("กรุณาเลือกไฟล์ JPG หรือ PNG ขนาดไม่เกิน 5 MB");
      return;
    }
    try {
      const bitmap = await createImageBitmap(file);
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas unavailable");
      const side = Math.min(bitmap.width, bitmap.height);
      context.drawImage(bitmap, (bitmap.width - side) / 2, (bitmap.height - side) / 2, side, side, 0, 0, 512, 512);
      bitmap.close();
      setPreview(canvas.toDataURL("image/jpeg", 0.86));
      setUploadError("");
    } catch {
      setUploadError("ไม่สามารถอ่านรูปนี้ได้ กรุณาลองไฟล์อื่น");
    }
  }

  function confirmAvatar() {
    if (!preview) return;
    if (!saveProfileAvatar(preview)) {
      setUploadError("ไม่สามารถบันทึกรูปในเบราว์เซอร์นี้ได้");
      return;
    }
    setUploadOpen(false);
    setPreview(null);
    setSaved(false);
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = { name: profile.name.trim(), email: profile.email.trim(), phone: profile.phone.trim() };
    if (saveAccountProfile(normalized)) {
      setDraft(null);
      setSaved(true);
      setProfileError("");
    } else {
      setSaved(false);
      setProfileError("ไม่สามารถบันทึกข้อมูลในเบราว์เซอร์นี้ได้");
    }
  }

  return <form onSubmit={save} className="rounded-2xl border border-amber-100 bg-white p-5 shadow-[0_3px_16px_-12px_rgba(112,74,8,.3)] sm:p-6">
    <div className="flex items-center gap-3">
      <span className="grid size-11 place-items-center rounded-xl bg-amber-100 text-orange-500"><UserRound className="size-5" /></span>
      <div className="min-w-0 flex-1"><h2 className="text-lg font-bold text-ink">ข้อมูลส่วนตัว</h2><p className="text-xs text-muted-foreground">จัดการข้อมูลส่วนตัวของคุณ</p></div>
      <button type="submit" className="hidden h-10 rounded-xl bg-primary px-5 text-sm font-bold text-ink transition hover:bg-primary-hover sm:inline-flex sm:items-center">บันทึกข้อมูล</button>
    </div>
    <div className="mt-6 grid gap-6 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-5">
      <div className="flex flex-col items-center">
        <button type="button" onClick={() => setUploadOpen(true)} aria-label="เปลี่ยนรูปโปรไฟล์" className="relative size-24 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          <div className="relative grid size-24 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-[#ffe78e] to-[#ffca42]"><ProfileAvatarImage alt={`รูปโปรไฟล์ของ ${profile.name}`} sizes="96px" /></div>
          <span className="absolute bottom-0 right-0 z-10 grid size-7 place-items-center rounded-full border-2 border-white bg-white text-ink shadow"><Camera className="size-4" /></span>
        </button>
        <button type="button" onClick={() => setUploadOpen(true)} className="mt-3 inline-flex h-9 items-center rounded-lg border border-border bg-white px-3 text-xs font-semibold transition hover:bg-muted">เปลี่ยนรูปโปรไฟล์</button>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 5 MB</p>
      </div>
      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        <label className="block min-w-0 text-xs font-medium text-muted-foreground">ชื่อ - นามสกุล<input required value={profile.name} onChange={(event) => { setDraft({ ...profile, name: event.target.value }); setSaved(false); }} className="mt-1.5 h-11 w-full rounded-xl border border-border bg-white px-3 text-sm font-medium text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/25" /></label>
        <label className="block min-w-0 text-xs font-medium text-muted-foreground">ชื่อผู้ใช้<input value={user.username} readOnly className="mt-1.5 h-11 w-full rounded-xl border border-border bg-muted/40 px-3 text-sm font-medium text-ink outline-none" /></label>
        <label className="block min-w-0 text-xs font-medium text-muted-foreground">อีเมล<div className="relative mt-1.5"><input required type="email" value={profile.email} onChange={(event) => { setDraft({ ...profile, email: event.target.value }); setSaved(false); }} className="h-11 w-full rounded-xl border border-border bg-white px-3 pr-9 text-sm font-medium text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/25" /><Check className="absolute right-3 top-3.5 size-4 text-emerald-500" /></div></label>
        <label className="block min-w-0 text-xs font-medium text-muted-foreground">เบอร์โทรศัพท์<div className="relative mt-1.5"><input required type="tel" inputMode="tel" value={profile.phone} onChange={(event) => { setDraft({ ...profile, phone: event.target.value }); setSaved(false); }} className="h-11 w-full rounded-xl border border-border bg-white px-3 pr-9 text-sm font-medium text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/25" /><span className="absolute right-2 top-3 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">ยืนยันแล้ว</span></div></label>
      </div>
    </div>
    <div className="mt-4 flex items-center justify-end gap-3 sm:hidden"><button type="submit" className="h-10 rounded-xl bg-primary px-5 text-sm font-bold text-ink">บันทึกข้อมูล</button></div>
    {saved && <p role="status" className="mt-3 text-right text-xs font-medium text-emerald-600">บันทึกข้อมูลในหน้าตัวอย่างแล้ว</p>}
    {profileError && <p role="alert" className="mt-3 text-right text-xs text-rose-600">{profileError}</p>}
    <Dialog open={uploadOpen} onOpenChange={(open) => { setUploadOpen(open); if (!open) { setPreview(null); setUploadError(""); } }}>
      <DialogContent>
        <DialogTitle>เปลี่ยนรูปโปรไฟล์</DialogTitle>
        <DialogDescription className="mt-1">เลือกรูปใหม่และดูตัวอย่างก่อนบันทึก</DialogDescription>
        <div className="mt-5 flex justify-center"><div className="relative size-32 overflow-hidden rounded-full border-4 border-white bg-primary/30 shadow-md"><Image src={preview ?? avatar} alt="ตัวอย่างรูปโปรไฟล์" fill sizes="128px" unoptimized={(preview ?? avatar).startsWith("data:")} className="object-cover object-top" /></div></div>
        <div className="relative mt-5 flex flex-col items-center rounded-xl border-2 border-dashed border-primary/70 bg-primary/5 px-4 py-6 text-center transition hover:bg-primary/10 focus-within:ring-2 focus-within:ring-primary/40"><UploadCloud className="size-7 text-amber-600" /><span className="mt-2 text-sm font-semibold">คลิกเพื่อเลือกรูปภาพ</span><span className="mt-1 text-xs text-muted-foreground">JPG หรือ PNG ขนาดไม่เกิน 5 MB</span><input id="settings-avatar-upload" type="file" accept="image/jpeg,image/png" aria-label="เลือกรูปโปรไฟล์ JPG หรือ PNG" onChange={chooseAvatar} className="absolute inset-0 size-full cursor-pointer opacity-0" /></div>
        {uploadError && <p role="alert" className="mt-3 text-xs text-rose-600">{uploadError}</p>}
        <div className="mt-5 flex gap-2"><button type="button" onClick={() => setUploadOpen(false)} className="h-10 flex-1 rounded-xl border border-border text-sm font-semibold">ยกเลิก</button><button type="button" disabled={!preview} onClick={confirmAvatar} className="h-10 flex-1 rounded-xl bg-primary text-sm font-bold text-ink disabled:cursor-not-allowed disabled:opacity-50">บันทึกรูปโปรไฟล์</button></div>
      </DialogContent>
    </Dialog>
  </form>;
}
