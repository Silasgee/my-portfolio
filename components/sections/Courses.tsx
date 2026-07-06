"use client";

import { motion, useReducedMotion } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import TextReveal from "@/components/ui/TextReveal";
import Reveal from "@/components/ui/Reveal";
import CourseIcon from "@/components/ui/CourseIcon";
import { courses } from "@/lib/data";

export default function Courses() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="courses" className="bg-white" aria-labelledby="courses-title">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-36">
        <div className="max-w-2xl">
          <Eyebrow>Courses</Eyebrow>
          <TextReveal
            as="h2"
            id="courses-title"
            text="Six skills. One outcome: income."
            highlight="income."
            className="mt-5 font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 text-lg leading-relaxed text-ink/60">
              Every course is a straight line from beginner to paid work —
              short lessons, live mentorship and real projects you can sell.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {courses.map((course, i) => (
            <motion.li
              key={course.slug}
              initial={
                reduceMotion ? { opacity: 0 } : { opacity: 0, y: 32 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: (i % 3) * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex flex-col rounded-3xl border border-ink/[0.08] bg-mist p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-ink/[0.14] hover:bg-white hover:shadow-[0_24px_60px_-24px_rgba(15,23,42,0.18)]"
            >
              {/* Gold seam that draws across the top on hover */}
              <span
                aria-hidden
                className="absolute left-8 right-8 top-0 h-[2px] origin-left scale-x-0 rounded-full bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100"
              />

              <div className="flex items-start justify-between">
                <div className="text-ink transition-transform duration-500 group-hover:-translate-y-1">
                  <CourseIcon icon={course.icon} />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink/35">
                  {course.kicker}
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-medium tracking-tight text-ink">
                {course.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                {course.description}
              </p>

              <ul className="mt-6 space-y-2.5" aria-label="What you'll learn">
                {course.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-2.5 text-sm text-ink/70">
                    <svg
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-gold"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M2 7.5L5.5 11 12 3.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {outcome}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center justify-between border-t border-ink/[0.08] pt-6">
                <div className="flex gap-2 text-[11px] font-semibold text-ink/45">
                  <span className="rounded-full border border-ink/10 px-2.5 py-1">
                    {course.duration}
                  </span>
                  <span className="rounded-full border border-ink/10 px-2.5 py-1">
                    {course.level}
                  </span>
                </div>
                <a
                  href="#contact"
                  className="flex items-center gap-1.5 text-sm font-semibold text-royal transition-colors hover:text-ink"
                  aria-label={`Enroll in ${course.title}`}
                >
                  Enroll
                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M3 8h10m0 0L9 4m4 4l-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
