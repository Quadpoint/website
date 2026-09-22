"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, AlertCircle } from "lucide-react";
import Link from "next/link";
import {
  contactFormSchema,
  type ContactFormValues,
  serviceOptions,
} from "@/lib/validations";
import { cn } from "@/lib/utils";
import { buildContactMailto } from "@/lib/contact-mailto";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5" role="alert">
      <AlertCircle size={12} />
      {message}
    </p>
  );
}

const inputBase =
  "contact-form-control w-full min-h-12 px-4 py-3 text-base border rounded-lg outline-none transition-[border-color,box-shadow,background-color] duration-150 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed sm:text-sm";

const inputNormal = "border-[#e5e7eb] hover:border-[#9ca3af]";
const inputError = "border-red-400 focus:border-red-400 focus:ring-red-200";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  function onSubmit(data: ContactFormValues) {
    window.location.assign(buildContactMailto(data));
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact inquiry form"
    >
      <div className="space-y-8">
        <fieldset>
          <legend className="contact-form-legend mb-4 w-full border-b pb-3 text-sm font-semibold">
            Contact details
          </legend>
          <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="contact-form-label block text-sm font-semibold mb-1.5"
          >
            Name <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(inputBase, errors.name ? inputError : inputNormal)}
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>

        {/* Business Name */}
        <div>
          <label
            htmlFor="businessName"
            className="contact-form-label block text-sm font-semibold mb-1.5"
          >
            Business Name <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="businessName"
            type="text"
            autoComplete="organization"
            placeholder="Your business or company"
            aria-required="true"
            aria-invalid={!!errors.businessName}
            className={cn(inputBase, errors.businessName ? inputError : inputNormal)}
            {...register("businessName")}
          />
          <FieldError message={errors.businessName?.message} />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="contact-form-label block text-sm font-semibold mb-1.5"
          >
            Email <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-required="true"
            aria-invalid={!!errors.email}
            className={cn(inputBase, errors.email ? inputError : inputNormal)}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="contact-form-label block text-sm font-semibold mb-1.5"
          >
            Phone{" "}
            <span className="contact-form-optional font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (555) 000-0000"
            aria-invalid={!!errors.phone}
            className={cn(inputBase, errors.phone ? inputError : inputNormal)}
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message} />
        </div>

          </div>
        </fieldset>

        <fieldset>
          <legend className="contact-form-legend mb-4 w-full border-b pb-3 text-sm font-semibold">
            Project details
          </legend>
          <div className="grid gap-5">
        <div>
          <label
            htmlFor="service"
            className="contact-form-label block text-sm font-semibold mb-1.5"
          >
            What do you need? <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <select
            id="service"
            aria-required="true"
            aria-invalid={!!errors.service}
            className={cn(
              inputBase,
              "appearance-none cursor-pointer",
              errors.service ? inputError : inputNormal
            )}
            defaultValue=""
            {...register("service")}
          >
            <option value="" disabled>
              Select a service area
            </option>
            {serviceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <FieldError message={errors.service?.message} />
        </div>

        <div>
          <label
            htmlFor="message"
            className="contact-form-label block text-sm font-semibold mb-1.5"
          >
            Message <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Tell us about your business, the challenge you're facing, or what you want to build."
            aria-required="true"
            aria-invalid={!!errors.message}
            className={cn(
              inputBase,
              "resize-none",
              errors.message ? inputError : inputNormal
            )}
            {...register("message")}
          />
          <FieldError message={errors.message?.message} />
        </div>

          </div>
        </fieldset>

        <div className="contact-consent rounded-lg border px-4 py-4">
          <label className="contact-form-consent flex items-start gap-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              className="mt-0.5 h-5 w-5 flex-shrink-0 accent-[#1a4fba]"
              aria-invalid={!!errors.privacyConsent}
              {...register("privacyConsent")}
            />
            <span>
              I consent to QuadPoint Technology collecting and using my
              submitted information to respond to this inquiry, as described in
              the{" "}
              <Link href="/privacy" className="contact-form-link font-semibold hover:underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          <FieldError message={errors.privacyConsent?.message} />
      </div>

      {/* Submit */}
      <div className="mt-6">
        <button
          type="submit"
          className="contact-submit inline-flex min-h-12 items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-[#1a4fba] text-sm font-semibold rounded-lg transition-[background-color,box-shadow,transform] active:translate-y-px"
        >
          Open Email Draft
          <Send size={14} />
        </button>
        <p className="contact-form-note mt-3 max-w-md text-xs leading-relaxed">
          Your email app will open with the inquiry prepared. Review it and
          press Send to deliver it.
        </p>
      </div>
      </div>
    </form>
  );
}
