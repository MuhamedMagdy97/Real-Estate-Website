import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/site-chrome";
import { isLocale, type Locale } from "@/lib/i18n";
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <div lang={locale} dir={locale==="ar"?"rtl":"ltr"} className="min-h-screen"><Header locale={locale as Locale}/><main>{children}</main><Footer locale={locale as Locale}/></div>}