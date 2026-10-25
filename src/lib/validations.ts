import { z } from "zod";

const optionalEmail = z.string().trim().email("Enter a valid email address.").optional().or(z.literal(""));

export const inquirySchema = z.object({
  propertyId: z.string().cuid().optional(),
  name: z.string().trim().min(2, "Enter your name.").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone number.").max(30),
  email: optionalEmail,
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(10, "Tell us how we can help.").max(2000),
  preferredContactMethod: z.enum(["PHONE", "EMAIL", "WHATSAPP"]).optional(),
  website: z.literal("").optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(10).max(200),
});

export const propertySchema = z.object({
  id: z.string().cuid().optional(), slug: z.string().trim().min(3).max(120).regex(/^[a-z0-9-]+$/),
  referenceNumber: z.string().trim().min(3).max(50), titleAr: z.string().trim().min(3), titleEn: z.string().trim().min(3),
  descriptionAr: z.string().trim().min(20), descriptionEn: z.string().trim().min(20),
  country: z.enum(["EGYPT", "SAUDI_ARABIA", "UAE"]), cityAr: z.string().trim().min(2), cityEn: z.string().trim().min(2),
  areaAr: z.string().trim().min(2), areaEn: z.string().trim().min(2), addressAr: z.string().trim().optional(), addressEn: z.string().trim().optional(),
  listingType: z.enum(["SALE", "RENT"]), propertyType: z.enum(["APARTMENT", "VILLA", "TOWNHOUSE", "PENTHOUSE", "COMMERCIAL", "LAND"]),
  price: z.coerce.number().int().positive().max(999999999), currency: z.enum(["EGP", "SAR", "AED"]),
  bedrooms: z.coerce.number().int().min(0).max(20).optional(), bathrooms: z.coerce.number().int().min(0).max(20).optional(), areaSqm: z.coerce.number().int().positive().max(100000).optional(),
  furnishingStatus: z.string().trim().max(50).optional(), completionStatus: z.string().trim().max(50).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]), isFeatured: z.boolean().default(false),
  images: z.array(z.string().url()).min(1).max(10), amenitiesAr: z.array(z.string().trim().min(1).max(50)).max(20), amenitiesEn: z.array(z.string().trim().min(1).max(50)).max(20),
});