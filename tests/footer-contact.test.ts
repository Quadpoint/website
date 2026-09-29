import assert from "node:assert/strict";
import test from "node:test";

import { footerEmailHref, footerFacebookHref } from "../lib/footer-contact.ts";

test("footer Facebook link points to QuadPoint Technology's page", () => {
  assert.equal(
    footerFacebookHref,
    "https://www.facebook.com/QuadPointTechnology"
  );
});

test("footer email link opens a composer for QuadPoint with a website inquiry subject", () => {
  const email = new URL(footerEmailHref);

  assert.equal(email.protocol, "mailto:");
  assert.equal(email.pathname, "quadpointtechnology@gmail.com");
  assert.equal(email.searchParams.get("subject"), "Website Inquiry — QuadPoint Technology");
  assert.equal(email.searchParams.get("body"), null);
});
