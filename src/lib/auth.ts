import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const key=()=>new TextEncoder().encode(process.env.AUTH_SECRET||"");
export async function login(email:string,password:string){if(!process.env.AUTH_SECRET||email!==process.env.ADMIN_EMAIL||password!==process.env.ADMIN_PASSWORD)return false;const token=await new SignJWT({role:"admin"}).setProtectedHeader({alg:"HS256"}).setIssuedAt().setExpirationTime("8h").sign(key());const jar=await cookies();jar.set("madar_admin",token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:28800});return true}
export async function logout(){const jar=await cookies();jar.delete("madar_admin")}
export async function isAdmin(){try{const token=(await cookies()).get("madar_admin")?.value;if(!token||!process.env.AUTH_SECRET)return false;const {payload}=await jwtVerify(token,key());return payload.role==="admin"}catch{return false}}
export async function requireAdmin(){if(!(await isAdmin()))redirect("/admin/login")}