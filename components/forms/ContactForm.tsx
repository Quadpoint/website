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
  "w-full px-4 py-3 text-sm text-[#1c1c2e] bg-white border rounded-lg outline-none transition-all duration-150 placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#1a4fba]/20 focus:border-[#1a4fba] disabled:opacity-50 disabled:cursor-not-allowed";

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
      <div className="grid sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[#374151] mb-1.5"
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
            className="block text-sm font-medium text-[#374151] mb-1.5"
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
            className="block text-sm font-medium text-[#374151] mb-1.5"
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
            className="block text-sm font-medium text-[#374151] mb-1.5"
          >
            Phone{" "}
            <span className="text-[#9ca3af] font-normal">(optional)</span>
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

        {/* Service dropdown — full width */}
        <div className="sm:col-span-2">
          <label
            htmlFor="service"
            className="block text-sm font-medium text-[#374151] mb-1.5"
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

        {/* Message — full width */}
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-[#374151] mb-1.5"
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

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm text-[#374151] leading-relaxed">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 flex-shrink-0 accent-[#1a4fba]"
              aria-invalid={!!errors.privacyConsent}
              {...register("privacyConsent")}
            />
            <span>
              I consent to QuadPoint Technology collecting and using my
              submitted information to respond to this inquiry, as described in
              the{" "}
              <Link href="/privacy" className="font-medium text-[#1a4fba] hover:underline">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          <FieldError message={errors.privacyConsent?.message} />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6">
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-[#1a4fba] text-white text-sm font-semibold rounded-lg hover:bg-[#1240a0] transition-colors shadow-sm hover:shadow-[0_4px_16px_-4px_rgba(26,79,186,0.5)]"
        >
          Open Email Draft
          <Send size={14} />
        </button>
        <p className="mt-3 text-xs text-[#9ca3af]">
          Your email app will open with the inquiry prepared. Review it and
          press Send to deliver it.
        </p>
      </div>
    </form>
  );
}
