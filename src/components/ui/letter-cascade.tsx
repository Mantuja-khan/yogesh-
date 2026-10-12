"use client";

import { cn } from "@/lib/utils";
import {
    type AnimationOptions,
    motion,
    stagger,
    useAnimate,
} from "framer-motion";
import React, { forwardRef, useCallback, useImperativeHandle, useState } from "react";

export interface LetterCascadeRef {
    trigger: () => void;
}

export interface LetterCascadeProps {
    /** The text to animate */
    text: string;
    /** Additional CSS classes for the container */
    className?: string;
    /** CSS classes applied to each individual letter, or resolver function */
    letterClassName?: string | ((index: number, letter: string) => string);
    /** Stagger delay between each letter in seconds */
    staggerDuration?: number;
    /** Where the stagger wave originates */
    staggerFrom?: "first" | "last" | "center" | number;
    /** Spring stiffness — higher = snappier */
    stiffness?: number;
    /** Spring damping — lower = bouncier */
    damping?: number;
    /** Trigger the animation on click instead of hover */
    triggerOnClick?: boolean;
    /** Callback when the full animation cycle completes */
    onComplete?: () => void;
}

export const LetterCascade = forwardRef<LetterCascadeRef, LetterCascadeProps>(
    function LetterCascade(
        {
            text,
            className,
            letterClassName,
            staggerDuration = 0.06,
            staggerFrom = "first",
            stiffness = 350,
            damping = 8,
            triggerOnClick = false,
            onComplete,
        },
        ref
    ) {
        const [scope, animate] = useAnimate();
        const [blocked, setBlocked] = useState(false);

        const trigger = useCallback(() => {
            if (blocked) return;
            setBlocked(true);

            const merge = (base: AnimationOptions): AnimationOptions => ({
                ...base,
                delay: stagger(staggerDuration, { from: staggerFrom }),
            });

            const spring: AnimationOptions = {
                type: "spring",
                stiffness,
                damping,
            };

            // Phase 1: front tilts back, echo flips in from below
            animate(
                ".cascade-front",
                {
                    rotateX: 90,
                    opacity: 0,
                    y: -6,
                    filter: "blur(4px)",
                },
                merge(spring)
            ).then(() => {
                // Instantly reset front
                animate(
                    ".cascade-front",
                    { rotateX: 0, opacity: 1, y: 0, filter: "blur(0px)" },
                    { duration: 0 }
                ).then(() => {
                    setBlocked(false);
                    onComplete?.();
                });
            });

            animate(
                ".cascade-echo",
                {
                    rotateX: 0,
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                },
                merge(spring)
            ).then(() => {
                // Instantly reset echo
                animate(
                    ".cascade-echo",
                    {
                        rotateX: -90,
                        opacity: 0,
                        y: 6,
                        scale: 0.8,
                        filter: "blur(4px)",
                    },
                    { duration: 0 }
                );
            });
        }, [
            blocked,
            animate,
            staggerDuration,
            staggerFrom,
            stiffness,
            damping,
            onComplete,
        ]);

        useImperativeHandle(ref, () => ({
            trigger,
        }), [trigger]);

        return (
            <span
                ref={scope}
                className={cn(
                    "inline-flex cursor-pointer select-none items-baseline justify-center",
                    className
                )}
                {...(triggerOnClick ? { onClick: trigger } : { onMouseEnter: trigger })}
                aria-label={text}
            >
                {text.split("").map((letter, i) => {
                    const resolvedClass =
                        typeof letterClassName === "function"
                            ? letterClassName(i, letter)
                            : letterClassName;

                    if (letter === " ") {
                        return (
                            <span
                                key={i}
                                className="inline-block"
                                style={{ width: "0.28em" }}
                                aria-hidden="true"
                            >
                                {" "}
                            </span>
                        );
                    }

                    return (
                        <span
                            key={i}
                            className="relative inline-flex whitespace-pre"
                            style={{ perspective: "500px" }}
                        >
                            {/* Front face — visible by default, tilts backward on trigger */}
                            <motion.span
                                className={cn("cascade-front inline-block", resolvedClass)}
                                style={{
                                    rotateX: 0,
                                    y: 0,
                                    transformOrigin: "bottom center",
                                    backfaceVisibility: "hidden",
                                }}
                            >
                                {letter}
                            </motion.span>

                            {/* Echo face — hidden below, flips up into view on trigger */}
                            <motion.span
                                className={cn(
                                    "cascade-echo absolute inset-0 inline-block",
                                    resolvedClass
                                )}
                                style={{
                                    rotateX: -90,
                                    opacity: 0,
                                    y: 6,
                                    scale: 0.8,
                                    filter: "blur(4px)",
                                    transformOrigin: "top center",
                                    backfaceVisibility: "hidden",
                                }}
                            >
                                {letter}
                            </motion.span>
                        </span>
                    );
                })}
            </span>
        );
    }
);

export default LetterCascade;
