import type { ContactFormValues } from "@/lib/validations";

const inquiryEmail = "quadpointtechnology@gmail.com";
const serviceLabels: Record<ContactFormValues["service"], string> = {
  "business-software": "Business Software",
  pos: "POS",
  crm: "CRM",
  "ai-agents": "AI Agents",
  "multi-agent-ai": "Multi-Agent AI",
  automation: "Automation",
  "web-application": "Web Application",
  "mobile-application": "Mobile Application",
  "custom-software": "Custom Software",
  other: "Other",
};

export function buildContactMailto(data: ContactFormValues) {
  const service = serviceLabels[data.service];
  const body = [
    "Hello QuadPoint Technology,",
    "",
    "A new inquiry was prepared through the website.",
    "",
    "<strong>Contact Details</strong>",
    `<strong>Name:</strong> ${data.name}`,
    `<strong>Business:</strong> ${data.businessName}`,
    `<strong>Email:</strong> ${data.email}`,
    `<strong>Phone:</strong> ${data.phone || "Not provided"}`,
    "",
    "<strong>Inquiry Details</strong>",
    `<strong>Service:</strong> ${service}`,
    "",
    "<strong>Message</strong>",
    data.message,
    "",
    "Regards,",
    data.name,
  ].join("\n");
  const params = new URLSearchParams({
    subject: `New Website Inquiry | ${service} | ${data.businessName}`,
    body,
  });

  return `mailto:${inquiryEmail}?${params.toString()}`;
}
