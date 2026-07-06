"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment, type ReactNode } from "react";

/**
 * Masked word-by-word reveal for display headlines.
 * Each word rises out of an overflow-hidden clip, staggered.
 */
export default function TextReveal({
  text,
  highlight,
  as: Tag = "h2",
  className = "",
  delay = 0,
  id,
}: {
  text: string;
  /** Word(s) to render in italic gold — matched case-insensitively. */
  highlight?: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  id?: string;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");
  const normalize = (w: string) => w.toLowerCase().replace(/[.,!?:]/g, "");
  const highlightWords = highlight ? highlight.split(" ").map(normalize) : [];

  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.055, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => {
        const isHighlight = highlightWords.includes(normalize(word));
        const rendered: ReactNode = isHighlight ? (
          <em className="font-display italic text-gold">{word}</em>
        ) : (
          word
        );
        return (
          <Fragment key={i}>
            <span aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
              <motion.span
                className="inline-block will-change-transform"
                variants={
                  reduceMotion
                    ? {
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                      }
                    : {
                        hidden: { y: "110%", rotate: 2 },
                        visible: {
                          y: 0,
                          rotate: 0,
                          transition: {
                            duration: 0.75,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        },
                      }
                }
              >
                {rendered}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </MotionTag>
  );
}
