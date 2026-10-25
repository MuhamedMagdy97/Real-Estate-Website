"use server";
import { redirect } from "next/navigation";
import { login,logout,requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
export async function loginAction(form:FormData){const ok=await login(String(form.get("email")||""),String(form.get("password")||""));if(!ok)redirect("/admin/login?error=1");redirect("/admin")}
export async function logoutAction(){await logout();redirect("/admin/login")}
export async function updateInquiryAction(form:FormData){await requireAdmin();const id=String(form.get("id"));const status=String(form.get("status"));if(!["NEW","CONTACTED","CLOSED"].includes(status))return;await db.inquiry.update({where:{id},data:{status:status as "NEW"|"CONTACTED"|"CLOSED"}});redirect("/admin/inquiries")}
export async function togglePropertyAction(form:FormData){await requireAdmin();const id=String(form.get("id"));const status=String(form.get("status"));if(!["DRAFT","PUBLISHED","ARCHIVED"].includes(status))return;await db.property.update({where:{id},data:{status:status as "DRAFT"|"PUBLISHED"|"ARCHIVED"}});redirect("/admin/properties")}