"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    label: "Office",
    value: "Dubai, United Arab Emirates",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: "hello@propellio.ai",
  },
  {
    icon: FaPhone,
    label: "Phone",
    value: "+971 4 000 0000",
  },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((r) => setTimeout(r, 800));
    console.info("Contact form submitted:", data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap gap-y-12">
          {/* Left: Form */}
          <div className="w-full px-4 lg:w-7/12">
            <div className="rounded-card border border-stroke-stroke bg-white p-8 shadow-card dark:border-stroke-dark dark:bg-dark sm:p-12">
              <h2 className="mb-2 text-heading-2 font-bold text-dark dark:text-white">
                Get in Touch
              </h2>
              <p className="mb-8 text-base text-body-color dark:text-body-color-dark">
                Have a question about a listing? Our team responds within 24 hours.
              </p>

              {submitted && (
                <div
                  role="alert"
                  className="mb-6 flex items-center gap-3 rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm font-medium text-success"
                >
                  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" />
                  </svg>
                  Message sent! We&apos;ll get back to you shortly.
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Input
                    label="Your Name"
                    type="text"
                    placeholder="Ahmad Al-Raya"
                    error={errors.name?.message}
                    {...register("name")}
                  />
                  <Input
                    label="Your Email"
                    type="email"
                    placeholder="you@example.com"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                </div>

                <Textarea
                  label="Message"
                  rows={5}
                  placeholder="Tell us how we can help..."
                  error={errors.message?.message}
                  {...register("message")}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending…" : "Send Message"}
                </Button>
              </form>
            </div>
          </div>

          {/* Right: Contact info */}
          <div className="w-full px-4 lg:w-5/12">
            <div className="mb-8">
              <h3 className="mb-2 text-heading-3 font-semibold text-dark dark:text-white">
                Contact Information
              </h3>
              <p className="text-sm text-body-color dark:text-body-color-dark">
                Reach us directly through any of the channels below.
              </p>
            </div>

            <ul className="mb-10 space-y-5">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-body-color dark:text-body-color-dark">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-dark dark:text-white">{value}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Map placeholder */}
            <div className="overflow-hidden rounded-card border border-stroke-stroke bg-gray-light dark:border-stroke-dark dark:bg-dark">
              <div className="flex aspect-video items-center justify-center">
                <div className="text-center">
                  <FaMapMarkerAlt className="mx-auto mb-2 h-8 w-8 text-body-color/40 dark:text-body-color-dark/40" aria-hidden="true" />
                  <p className="text-sm text-body-color dark:text-body-color-dark">
                    Dubai, UAE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
