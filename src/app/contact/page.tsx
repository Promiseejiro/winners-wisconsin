"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialFormData: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function getContactEndpoint(): string {
  const configuredUrl = (
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
  ).replace(/\/+$/, "");

  // Supports both:
  // NEXT_PUBLIC_API_URL=http://localhost:3000
  // NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
  if (configuredUrl.endsWith("/api/v1")) {
    return `${configuredUrl}/contact`;
  }

  return `${configuredUrl}/api/v1/contact`;
}

const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm text-[#111] outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-gray-100";

const labelClass = "mb-2 block text-sm font-semibold text-[#222]";

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrorMessage("");
    setSuccessMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    setErrorMessage("");
    setSuccessMessage("");

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    if (
      !payload.firstName ||
      !payload.lastName ||
      !payload.email ||
      !payload.subject ||
      !payload.message
    ) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (payload.message.length < 5) {
      setErrorMessage("Please provide a little more detail in your message.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(getContactEndpoint(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const backendMessage =
          typeof result?.message === "string"
            ? result.message
            : Array.isArray(result?.message)
              ? result.message.join(", ")
              : "";

        throw new Error(
          backendMessage || "We could not send your message. Please try again.",
        );
      }

      setSuccessMessage(
        "Thank you for contacting us! Your enquiry has been submitted successfully. Our team will get back to you as soon as possible.",
      );

      setFormData({ ...initialFormData });
    } catch (error) {
      console.error("Contact form submission failed:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-[#111]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#111] px-5 py-20 text-white sm:py-24">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/[0.04]" />
        <div className="absolute -bottom-36 -left-16 h-80 w-80 rounded-full bg-white/[0.04]" />

        <div className="relative mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[3px] text-primary">
            Winners Chapel International Wisconsin
          </p>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
            We&apos;d love to{" "}
            <span className="text-primary">hear from you.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            Have a question, need assistance, or want to get in touch with our
            church? Send us a message and our team will be happy to connect with
            you.
          </p>

          <div className="mt-8 h-1 w-20 bg-primary" />
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="bg-white px-5 py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* CONTACT INFORMATION */}
          <aside className="space-y-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[3px] text-primary">
                Get in touch
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight text-[#111] sm:text-4xl">
                How can we help?
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                Whether you have a question about our services, need information
                about our ministry, or would like to share a message, please use
                the contact form.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex gap-4 border border-gray-200 bg-white p-5 transition hover:border-primary/50">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#f8f8f8] text-xl text-primary">
                  <span aria-hidden="true">✉</span>
                </div>

                <div>
                  <h3 className="font-bold text-[#111]">Send us a message</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Complete the contact form and your enquiry will be sent to
                    our team.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border border-gray-200 bg-white p-5 transition hover:border-primary/50">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#f8f8f8] text-xl text-primary">
                  <span aria-hidden="true">✦</span>
                </div>

                <div>
                  <h3 className="font-bold text-[#111]">
                    We&apos;re here to help
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Our team will review your enquiry and respond as soon as
                    possible.
                  </p>
                </div>
              </div>

              <div className="bg-[#111] p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-[2px] text-primary">
                  We welcome you
                </p>

                <h3 className="mt-3 text-xl font-bold">
                  We look forward to hearing from you.
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/70">
                  Thank you for reaching out to Winners Chapel International
                  Wisconsin. We appreciate your message.
                </p>

                <div className="mt-5 h-1 w-12 bg-primary" />
              </div>
            </div>
          </aside>

          {/* CONTACT FORM */}
          <div className="border border-gray-200 bg-white p-6 shadow-sm sm:p-9">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[2px] text-primary">
                Contact us
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#111] sm:text-3xl">
                Send us a message
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                Fields marked with an asterisk (*) are required.
              </p>
            </div>

            {successMessage && (
              <div
                role="status"
                aria-live="polite"
                className="mb-6 border border-gray-200 bg-[#f8f8f8] p-4 text-sm leading-6 text-[#222]"
              >
                <p className="font-bold text-[#111]">
                  Message submitted successfully
                </p>
                <p className="mt-1">{successMessage}</p>
              </div>
            )}

            {errorMessage && (
              <div
                role="alert"
                aria-live="assertive"
                className="mb-6 border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
              >
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className={labelClass}>
                    First name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    maxLength={100}
                    required
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className={labelClass}>
                    Last name *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    maxLength={100}
                    required
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={254}
                    required
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={40}
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className={labelClass}>
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="General enquiry">General enquiry</option>
                  <option value="Prayer request">Prayer request</option>
                  <option value="Church services">Church services</option>
                  <option value="Ministry information">
                    Ministry information
                  </option>
                  <option value="Testimony">Testimony</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  Your message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  maxLength={10000}
                  required
                  disabled={isSubmitting}
                  className={`${inputClass} resize-y leading-6`}
                />

                <p className="mt-2 text-right text-xs text-gray-500">
                  {formData.message.length}/10000 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-3 bg-primary px-6 py-4 text-sm font-bold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    />
                    Sending your message...
                  </>
                ) : (
                  <>
                    Send message
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs leading-5 text-gray-500">
                Your information will be used to respond to your enquiry.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* BOTTOM CALL TO ACTION */}
      <section className="bg-[#f8f8f8] px-5 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[2px] text-primary">
              Winners Chapel International Wisconsin
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#111]">
              We look forward to connecting with you.
            </h2>
          </div>

          <a
            href="/"
            className="inline-flex items-center justify-center border border-[#111] px-6 py-3 text-sm font-bold text-[#111] transition hover:bg-[#111] hover:text-white"
          >
            Back to Home
          </a>
        </div>
      </section>
    </main>
  );
}
