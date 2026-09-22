import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function read(relativePath: string) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

const page = read("app/contact/page.tsx");
const form = read("components/forms/ContactForm.tsx");
const styles = read("app/globals.css");

test("keeps the contact form on a readable light surface inside the dark site theme", () => {
  assert.match(page, /contact-page/);
  assert.match(page, /contact-form-panel/);
  assert.match(styles, /\.contact-page \.contact-form-panel/);
  assert.match(styles, /\.contact-page \.contact-form-control/);
  assert.match(styles, /background(?:-color)?: #ffffff !important/);
  assert.match(styles, /color: #1c1c2e !important/);
});

test("groups the inquiry fields into contact and project details", () => {
  assert.match(form, /<fieldset/);
  assert.match(form, />\s*Contact details\s*</);
  assert.match(form, />\s*Project details\s*</);
});

test("uses warm icon tiles with dark icons on the light contact card", () => {
  assert.match(
    styles,
    /\.contact-page \.contact-icon\s*\{[\s\S]*background-color: #fff0d5 !important/
  );
  assert.match(
    styles,
    /\.contact-page \.contact-icon svg\s*\{[\s\S]*color: #172033 !important/
  );
});
