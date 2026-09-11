"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import {
  contactFormSchema,
  type ContactFormValues,
  serviceOptions,
} from "@/lib/validations";
import { cn } from "@/lib/utils";

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
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  /**
   * Form submission handler.
   * Currently logs to console — ready for Resend/email integration.
   * To add Resend: replace the console.log with a fetch to /api/contact,
   * which can use the Resend SDK to send the data via email.
   */
  async function onSubmit(data: ContactFormValues) {
    try {
      // TODO: Replace with actual email delivery
      // e.g. await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
      console.log("Contact form submission:", data);

      // Simulate network delay for now
      await new Promise((resolve) => setTimeout(resolve, 800));

      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-5">
          <CheckCircle2 size={26} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-[#1c1c2e] mb-2">
          Message Sent
        </h3>
        <p className="text-[#6b7280] text-sm mb-6 max-w-xs">
          Thank you for reaching out. We&apos;ll review your message and get back
          to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setSubmitState("idle")}
          className="text-sm font-semibold text-[#1a4fba] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
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
      </div>

      {/* Error state */}
      {submitState === "error" && (
        <div
          className="mt-4 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700"
          role="alert"
        >
          <AlertCircle size={16} className="flex-shrink-0" />
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      {/* Submit */}
      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-[#1a4fba] text-white text-sm font-semibold rounded-lg hover:bg-[#1240a0] transition-colors shadow-sm hover:shadow-[0_4px_16px_-4px_rgba(26,79,186,0.5)] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <span
                className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
                aria-hidden="true"
              />
              Sending…
            </>
          ) : (
            <>
              Send Inquiry
              <Send size={14} />
            </>
          )}
        </button>
        <p className="mt-3 text-xs text-[#9ca3af]">
          We typically respond within one business day.
        </p>
      </div>
    </form>
  );
}
