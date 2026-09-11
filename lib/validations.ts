import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(150, "Business name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[+\d\s\-().]{7,20}$/.test(val),
      "Please enter a valid phone number"
    ),
  service: z.enum(
    [
      "business-software",
      "pos",
      "crm",
      "ai-agents",
      "multi-agent-ai",
      "automation",
      "web-application",
      "mobile-application",
      "custom-software",
      "other",
    ],
    { required_error: "Please select what you need" }
  ),
  message: z
    .string()
    .min(20, "Please provide a bit more detail (at least 20 characters)")
    .max(2000, "Message is too long"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const serviceOptions = [
  { value: "business-software", label: "Business Software" },
  { value: "pos", label: "POS" },
  { value: "crm", label: "CRM" },
  { value: "ai-agents", label: "AI Agents" },
  { value: "multi-agent-ai", label: "Multi-Agent AI" },
  { value: "automation", label: "Automation" },
  { value: "web-application", label: "Web Application" },
  { value: "mobile-application", label: "Mobile Application" },
  { value: "custom-software", label: "Custom Software" },
  { value: "other", label: "Other" },
] as const;
