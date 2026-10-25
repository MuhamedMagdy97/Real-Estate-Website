import { describe, expect, it } from "vitest";
import { inquirySchema } from "@/lib/validations";

describe("inquirySchema", () => {
  it("accepts an appropriate inquiry", () => {
    const result = inquirySchema.safeParse({
      name: "Mariam Hassan", phone: "+20 100 123 4567", email: "mariam@example.com",
      message: "I would like to schedule a viewing this week.", preferredContactMethod: "PHONE", website: ""
    });
    expect(result.success).toBe(true);
  });

  it("rejects a bot honeypot and missing contact details", () => {
    const result = inquirySchema.safeParse({ name: "A", phone: "", message: "short", website: "https://spam.example" });
    expect(result.success).toBe(false);
  });
});