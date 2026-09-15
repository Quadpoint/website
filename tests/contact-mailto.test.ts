import assert from "node:assert/strict";
import test from "node:test";

import { buildContactMailto } from "../lib/contact-mailto.ts";
import { contactFormSchema } from "../lib/validations.ts";

const inquiry = {
  name: "Alex Rivera",
  businessName: "Rivera Retail",
  email: "alex@example.com",
  phone: "+63 912 345 6789",
  service: "business-software" as const,
  message: "We need a better way to manage daily inventory.",
  privacyConsent: true as const,
};

test("builds a pre-addressed inquiry draft with every submitted detail", () => {
  const mailto = new URL(buildContactMailto(inquiry));

  assert.equal(mailto.protocol, "mailto:");
  assert.equal(mailto.pathname, "quadpointtechnology@gmail.com");
  assert.equal(
    mailto.searchParams.get("subject"),
    "New Website Inquiry | Business Software | Rivera Retail"
  );
  assert.match(mailto.searchParams.get("body") ?? "", /<strong>Contact Details<\/strong>/);
  assert.match(mailto.searchParams.get("body") ?? "", /<strong>Name:<\/strong> Alex Rivera/);
  assert.match(mailto.searchParams.get("body") ?? "", /<strong>Inquiry Details<\/strong>/);
  assert.match(mailto.searchParams.get("body") ?? "", /<strong>Message<\/strong>/);
  assert.match(mailto.searchParams.get("body") ?? "", /better way to manage daily inventory/);
});

test("requires explicit privacy consent", () => {
  const result = contactFormSchema.safeParse({
    ...inquiry,
    privacyConsent: false,
  });

  assert.equal(result.success, false);
  if (!result.success) {
    assert.equal(result.error.flatten().fieldErrors.privacyConsent?.[0], "Please consent to the Privacy Policy");
  }
});
