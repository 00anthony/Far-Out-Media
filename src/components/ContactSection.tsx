"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────
   TYPES — mirror the Sanity `contactSection` schema
───────────────────────────────────────────────────────────────────── */
export type FieldType = "text" | "email" | "tel" | "textarea";

export interface FormField {
  name: string;           // internal key sent to the API, e.g. "phone"
  label: string;          // floating label, e.g. "Phone Number"
  type: FieldType;
  required: boolean;
  colSpan: "half" | "full";
}

export interface ContactSectionData {
  eyebrow: string;
  headingFirst: string;
  headingAccent: string;
  accentColor: string;
  subheading: string;
  projectTypes: string[];  // pill buttons — add/remove/reorder in Studio
  formFields: FormField[]; // dynamic fields — add phone, budget, etc. in Studio
  submitLabel: string;
  successHeading: string;
  successBody: string;
  successFooter: string;
  footerLeft: string;
  footerRight: string;
}

/* ─────────────────────────────────────────────────────────────────────
   DEFAULTS
   Used when Sanity returns null / no data prop passed.
───────────────────────────────────────────────────────────────────── */
const DEFAULTS: ContactSectionData = {
  eyebrow: "Ready to Begin?",
  headingFirst: "Let's Create",
  headingAccent: "Something Far Out.",
  accentColor: "#C2B280",
  subheading: "Tell us about your project. We'll get back within 24 hours with a custom plan—no obligation.",
  projectTypes: [
    "Brand Video",
    "Drone Footage",
    "Event Coverage",
    "Real Estate",
    "Social Media Content",
    "Other",
  ],
  formFields: [
    { name: "name",    label: "Your Name",                  type: "text",     required: true,  colSpan: "half" },
    { name: "email",   label: "Email Address",              type: "email",    required: true,  colSpan: "half" },
    { name: "company", label: "Company / Brand",            type: "text",     required: false, colSpan: "half" },
    { name: "message", label: "Tell us about your project", type: "textarea", required: true,  colSpan: "full" },
  ],
  submitLabel: "Get a Free Quote",
  successHeading: "Message Received.",
  successBody: "We'll review your project and reach out within 24 hours. Get ready for something far out.",
  successFooter: "Far Out Media · Charlotte, NC",
  footerLeft: "Serving Charlotte, NC",
  footerRight: "Currently Accepting Projects",
};

/* ─────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────── */
type FormState = "idle" | "loading" | "success" | "error";

export default function ContactSection({ data }: { data?: ContactSectionData | null }) {
  const d: ContactSectionData = data ?? DEFAULTS;

  // Build initial form values dynamically from field definitions
  const buildInitialValues = () => {
    const values: Record<string, string> = { projectType: "" };
    d.formFields.forEach((f) => { values[f.name] = ""; });
    return values;
  };

  const [formState, setFormState]       = useState<FormState>("idle");
  const [formData, setFormData]         = useState<Record<string, string>>(buildInitialValues);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Something went wrong.");
      }
      setFormState("success");
    } catch (err: unknown) {
      setFormState("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  };
  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 bg-zinc-950 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-275 bg-[#C2B280]/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-100 h-100 bg-[#94aec2]/6 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 w-75 h-75 bg-[#657886]/5 rounded-full blur-[100px]" />
      </div>

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
            <motion.div
              variants={lineVariants}
              style={{ transformOrigin: "left", background: d.accentColor }}
              className="h-px w-12"
            />
            <span className="text-xs font-bold tracking-[0.5em] uppercase" style={{ color: d.accentColor }}>
              {d.eyebrow}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
            {d.headingFirst} <br />
            <span className="pr-2 text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-600">
              {d.headingAccent}
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p variants={fadeUp} className="text-white text-base md:text-lg max-w-xl mb-16 leading-relaxed">
            {d.subheading}
          </motion.p>

          {/* Divider */}
          <motion.div
            variants={lineVariants}
            style={{ transformOrigin: "left" }}
            className="h-px w-full bg-linear-to-r from-[#C2B280]/40 via-zinc-700/40 to-transparent mb-16"
          />

          {/* Form / Success */}
          <AnimatePresence mode="wait">
            {formState === "success" ? (
              <SuccessState key="success" d={d} />
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10"
              >
                {/* Project type pills */}
                {d.projectTypes.length > 0 && (
                  <motion.div variants={fadeUp} className="flex flex-col gap-3 md:col-span-2">
                    <span className="text-[10px] tracking-[0.35em] uppercase text-zinc-500 font-semibold">
                      Project Type
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {d.projectTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, projectType: type }))}
                          className="cursor-pointer px-3 py-1.5 text-[11px] tracking-widest uppercase font-semibold border transition-all duration-200"
                          style={
                            formData.projectType === type
                              ? { borderColor: d.accentColor, color: d.accentColor, background: `${d.accentColor}1a` }
                              : { borderColor: "#3f3f46", color: "#71717a" }
                          }
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* Dynamic fields from Sanity */}
                {d.formFields.map((field) => (
                  <motion.div
                    key={field.name}
                    variants={fadeUp}
                    className={`relative ${field.colSpan === "full" ? "md:col-span-2" : ""}`}
                  >
                    <FieldLabel
                      label={field.label}
                      focused={focusedField === field.name}
                      filled={!!formData[field.name]}
                      accentColor={d.accentColor}
                    />

                    {field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        required={field.required}
                        rows={4}
                        value={formData[field.name] ?? ""}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        placeholder={field.label}
                        className="w-full bg-transparent border-b border-zinc-700 py-3 pt-5 text-white text-sm focus:outline-none resize-none transition-colors duration-200 placeholder-transparent"
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        required={field.required}
                        value={formData[field.name] ?? ""}
                        onChange={handleChange}
                        onFocus={() => setFocusedField(field.name)}
                        onBlur={() => setFocusedField(null)}
                        placeholder={field.label}
                        className="w-full bg-transparent border-b border-zinc-700 py-3 pt-5 text-white text-sm focus:outline-none transition-colors duration-200 placeholder-transparent"
                      />
                    )}

                    <FieldUnderline active={focusedField === field.name} accentColor={d.accentColor} />
                  </motion.div>
                ))}

                

                {/* Error */}
                <AnimatePresence>
                  {formState === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="md:col-span-2 text-red-400 text-sm tracking-wide"
                    >
                      {errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.div
                  variants={fadeUp}
                  className="md:col-span-2 flex flex-col md:flex-row items-start md:items-center gap-6 pt-4"
                >
                  <SubmitButton label={d.submitLabel} loading={formState === "loading"} accentColor={d.accentColor} />
                  <p className="text-zinc-600 text-xs tracking-[0.3em] uppercase">
                    48-hour response
                  </p>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Footer */}
          <motion.div
            variants={fadeUp}
            className="mt-20 pt-10 border-t border-zinc-800/60 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <p className="text-zinc-600 text-xs tracking-[0.4em] uppercase">{d.footerLeft}</p>
            <div className="flex items-center gap-6">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: d.accentColor }} />
              <p className="text-zinc-600 text-xs tracking-widest uppercase">{d.footerRight}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────────── */

function SuccessState({ d }: { d: ContactSectionData }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      className="flex flex-col items-center justify-center py-24 text-center gap-6"
    >
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
        <motion.circle cx="32" cy="32" r="30" stroke={d.accentColor} strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.path d="M20 33 L28 41 L44 24" stroke={d.accentColor} strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        />
      </svg>
      <h3 className="text-3xl font-black tracking-tight text-white">{d.successHeading}</h3>
      <p className="text-zinc-400 max-w-sm">{d.successBody}</p>
      <p className="text-xs tracking-[0.4em] uppercase mt-2" style={{ color: d.accentColor }}>
        {d.successFooter}
      </p>
    </motion.div>
  );
}

function FieldLabel({ label, focused, filled, accentColor }: {
  label: string; focused: boolean; filled: boolean; accentColor: string;
}) {
  return (
    <motion.label
      animate={{ y: focused || filled ? 0 : 20, color: focused ? accentColor : "#71717a" }}
      transition={{ duration: 0.2 }}
      className="absolute top-0 left-0 text-[10px] tracking-[0.35em] uppercase font-semibold pointer-events-none"
      style={{ color: "#71717a" }}
    >
      {label}
    </motion.label>
  );
}

function FieldUnderline({ active, accentColor }: { active: boolean; accentColor: string }) {
  return (
    <motion.div
      className="absolute bottom-0 left-0 h-px"
      style={{ background: accentColor, transformOrigin: "left", width: "100%" }}
      animate={{ scaleX: active ? 1 : 0 }}
      initial={{ scaleX: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
    />
  );
}

function SubmitButton({ label, loading, accentColor }: {
  label: string; loading: boolean; accentColor: string;
}) {
  return (
    <motion.button
      type="submit"
      disabled={loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="group relative px-14 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ background: accentColor }}
      />
      <span className="relative z-10 flex items-center gap-3">
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
            </svg>
            Sending...
          </>
        ) : (
          <>
            {label}
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </span>
    </motion.button>
  );
}