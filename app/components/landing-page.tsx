"use client";

import Link from "next/link";
import Image from "next/image";

import { easeOut, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CreditCard,
  HeartHandshake,
  LayoutTemplate,
  MonitorSmartphone,
  PartyPopper,
  PenTool,
  Sparkles,
  Star,
  TimerReset,
  WandSparkles,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: easeOut },
};

const featureCards = [
  {
    icon: WandSparkles,
    title: "Beautiful templates",
    description:
      "Start with elegant wedding-first templates that already feel premium and shareable.",
  },
  {
    icon: MonitorSmartphone,
    title: "Live preview",
    description:
      "See the invitation update in real time while you edit details on desktop or mobile.",
  },
  {
    icon: CreditCard,
    title: "Premium downloads",
    description:
      "Unlock HD PNG, PDF, and envelope designs with premium plans.",
  },
  {
    icon: HeartHandshake,
    title: "Share with one link",
    description:
      "Publish a clean invitation page that can be shared instantly on WhatsApp and social apps.",
  },
];

const templatePreviews = [
  {
    src: "/Elegant gold wedding invitation design.png",
    title: "Elegant Gold",
  },
  {
    src: "/Modern geometric wedding invitation design.png",
    title: "Modern Geometric",
  },
  {
    src: "/Romantic vintage wedding invitation design.png",
    title: "Romantic Vintage",
  },
  {
    src: "/Traditional Indian wedding invitation design.png",
    title: "Traditional Indian",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose a Template",
    text: "Select from our variety of culturally appropriate and professionally designed templates.",
  },
  {
    number: "02",
    title: "Fill Your Details",
    text: "Enter your personal information, family details, and event timings in our simple form.",
  },
  {
    number: "03",
    title: "Download & Share",
    text: "Preview, download, and share your invitation digitally or print it.",
  },
];

const featuresList = [
  { title: "Multi-language Support", desc: "English, Hindi, Marathi, Gujarati, Telugu, Bengali and more." },
  { title: "Beautiful Templates", desc: "Professionally designed templates that make your invitation stand out." },
  { title: "Multiple Formats", desc: "Download your invitation in PDF, HD image, or share it digitally." },
  { title: "All Communities", desc: "Templates for Hindu, Muslim, Christian, Sikh, Buddhist, and Jain communities." },
  { title: "Data Privacy", desc: "Your personal information is secure. We don't store your data unnecessarily." },
  { title: "Easy Customization", desc: "Simple editor to add, edit or remove sections. Create a truly personalized profile." }
];

const testimonials = [
  {
    name: "Aarav & Meera",
    quote:
      "The template felt premium immediately, and the preview made the whole process simple.",
  },
  {
    name: "Priya Sharma",
    quote:
      "The landing page makes the product feel trustworthy, modern, and easy to understand.",
  },
];

const faqs = [
  {
    question: "What are the first templates you will launch?",
    answer:
      "Wedding, royal wedding, floral wedding, traditional Indian wedding, and modern wedding templates are first in line.",
  },
  {
    question: "Will the free version have a watermark?",
    answer:
      "Yes. Free cards will keep subtle InviteHub branding until the user upgrades to a premium plan.",
  },
  {
    question: "How do premium downloads work?",
    answer:
      "Premium plans unlock HD downloads, PDF exports, and matching envelope designs for weddings.",
  },
];

export function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.88),_transparent_30%),radial-gradient(circle_at_right,_rgba(247,198,168,0.45),_transparent_24%)]" />
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-20 pt-8 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex items-center justify-between gap-4 rounded-full border border-[var(--border)] bg-[color:var(--surface)]/85 px-4 py-3 shadow-[0_10px_40px_rgba(120,64,42,0.08)] backdrop-blur"
        >
          <div className="flex items-center w-40 sm:w-56 h-10 relative">
            <Image
              src="/elegant_logo_with_domain_written.png"
              alt="InviteHub.in Logo"
              width={400}
              height={120}
              className="absolute -left-2 top-1/2 -translate-y-1/2 w-[180%] max-w-none h-auto object-contain drop-shadow-sm"
              priority
            />
          </div>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[#6f2216]"
          >
            Browse Templates
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="max-w-2xl">
            <motion.div
              {...fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-black/70 shadow-sm"
            >
              <BadgeCheck className="h-4 w-4 text-[var(--accent)]" />
              Premium wedding invitation maker
            </motion.div>

            <motion.h1
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.05 }}
              className="text-balance text-5xl font-semibold tracking-tight text-[var(--foreground)] sm:text-6xl lg:text-7xl"
            >
              Create your invitation card now.
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="mt-6 max-w-xl text-lg leading-8 text-black/70 sm:text-xl"
            >
              Choose a beautiful template, personalize your event details, and instantly preview your design. Download premium high-resolution cards or share your unique link directly with friends and family.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[rgba(140,47,29,0.22)] transition hover:-translate-y-0.5 hover:bg-[#6f2216]"
              >
                Browse Templates
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/90 px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:-translate-y-0.5 hover:bg-[var(--surface-soft)]"
              >
                See how it works
              </Link>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
              className="mt-10 grid gap-4 sm:grid-cols-3"
            >
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
                <p className="text-2xl font-semibold">100%</p>
                <p className="mt-1 text-sm text-black/65">Customizable</p>
              </div>
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
                <p className="text-2xl font-semibold">2 min</p>
                <p className="mt-1 text-sm text-black/65">To create your invite</p>
              </div>
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
                <p className="text-2xl font-semibold">Multiple</p>
                <p className="mt-1 text-sm text-black/65">Export formats</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-[#f8c4a8]/40 blur-3xl" />
            <div className="absolute -right-10 bottom-12 h-28 w-28 rounded-full bg-[#a33622]/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.94),_rgba(255,248,243,0.88))] p-5 shadow-[0_30px_80px_rgba(122,67,45,0.16)]">
              <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
                <div>
                  <p className="text-sm font-medium text-black/60">Live invitation preview</p>
                  <p className="text-lg font-semibold">Ashwani & Priya</p>
                </div>
                <div className="rounded-full bg-[var(--surface-soft)] px-3 py-2 text-xs font-semibold text-[var(--accent)]">Wedding Invitation</div>
              </div>

              <div className="mt-5">
                <div className="mb-4">
                  <Image
                    src="/Wedding invitation on modern desk setup.png"
                    alt="Invitation mockup on desk"
                    width={640}
                    height={400}
                    className="rounded-[1rem] object-cover shadow-md"
                  />
                </div>

                <div className="grid gap-4 rounded-[1.5rem] bg-white p-5 shadow-sm sm:grid-cols-[0.95fr_1.05fr]">
                  <div className="rounded-[1.25rem] bg-[linear-gradient(180deg,_#8c2f1d,_#c96b4f)] p-5 text-white shadow-lg shadow-[rgba(140,47,29,0.18)]">
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <PartyPopper className="h-4 w-4" />
                      August 2026
                    </div>
                    <p className="mt-16 text-3xl font-semibold leading-tight">Save the date for a celebration filled with joy and family.</p>
                    <p className="mt-4 text-sm text-white/85">Couple photo, family details, venue, RSVP, and map links appear instantly in the final card.</p>
                  </div>

                  <div className="flex flex-col justify-between gap-4 rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-soft)] p-5">
                    <div className="flex items-start gap-3">
                      <TimerReset className="mt-1 h-5 w-5 text-[var(--accent)]" />
                      <div>
                        <p className="font-semibold">Countdown timer</p>
                        <p className="text-sm text-black/65">Show how much time is left until the wedding day.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <LayoutTemplate className="mt-1 h-5 w-5 text-[var(--accent)]" />
                      <div>
                        <p className="font-semibold">Template matched envelope</p>
                        <p className="text-sm text-black/65">Premium plans unlock matching envelope designs and downloads.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <PenTool className="mt-1 h-5 w-5 text-[var(--accent)]" />
                      <div>
                        <p className="font-semibold">Editable invitation details</p>
                        <p className="text-sm text-black/65">Build the card from a clean form that keeps the content organized.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="templates" className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Templates</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Browse Templates.</h2>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
            <Link href="/templates" className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface-soft)] shadow-sm">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {templatePreviews.map((t, index) => (
            <motion.article
              key={t.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.05 }}
              className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-0 overflow-hidden shadow-[0_16px_40px_rgba(122,67,45,0.08)]"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={t.src}
                  alt={t.title}
                  fill
                  sizes="(min-width:1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm text-black/65">Preview of the {t.title} template.</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="why-choose" className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <motion.div {...fadeUp} className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Features</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Why Choose Our Invitation Maker?</h2>
          <p className="mt-4 text-lg text-black/70">
            Our invitation maker is designed to make the process of creating a professional and attractive wedding invitation as simple as possible.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuresList.map((feature, index) => (
            <motion.div
              key={feature.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.05 }}
              className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)] mb-4">
                <Check className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-black/65 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <motion.div {...fadeUp} className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">How to Create Your Wedding Invitation</h2>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.08 }}
              className="rounded-[1.75rem] border border-[var(--border)] bg-[linear-gradient(180deg,_rgba(255,255,255,0.9),_rgba(255,248,243,0.96))] p-6 shadow-sm"
            >
              <p className="text-sm font-semibold tracking-[0.25em] text-[var(--accent)]">{step.number}</p>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-black/65">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing section removed as requested */}

      <section className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <motion.div {...fadeUp} className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Testimonials</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Loved by couples and families.</h2>
        </motion.div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.08 }}
              className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm"
            >
              <div className="flex gap-1 text-[var(--accent)]">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <blockquote className="mt-4 text-lg leading-8 text-black/75">{testimonial.quote}</blockquote>
              <figcaption className="mt-6 text-sm font-semibold">{testimonial.name}</figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <motion.div {...fadeUp} className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Wedding invitation FAQs.</h2>
        </motion.div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {faqs.map((faq, index) => (
            <motion.article
              key={faq.question}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.06 }}
              className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm"
            >
              <h3 className="text-base font-semibold leading-7">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-black/65">{faq.answer}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-16 pt-8 sm:px-8 lg:px-12">
        <motion.div
          {...fadeUp}
          className="flex flex-col gap-6 rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(135deg,_rgba(140,47,29,0.98),_rgba(207,110,79,0.95))] px-6 py-8 text-white shadow-[0_30px_80px_rgba(140,47,29,0.22)] sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">Get started</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Create Your Invitation Now.</h2>
            <p className="mt-4 text-sm leading-7 text-white/85">
              Choose a template, personalize your details, preview instantly, and share your invitation link with guests.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/templates"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--accent)] transition hover:-translate-y-0.5"
            >
              Create Invitation Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}