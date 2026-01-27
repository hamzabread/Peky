"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Video = () => {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const pillsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for sequential animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Fast fade and slide animations
      tl.from(badgeRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          descriptionRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          pillsRef.current.children,
          {
            opacity: 0,
            scale: 0.8,
            y: 20,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.5)",
          },
          "-=0.3"
        )
        .from(
          ctaRef.current,
          {
            opacity: 1,
            y: 30,
            scale: 0.95,
            duration: 0.6,
            ease: "back.out(1.3)",
          },
          "-=0.2"
        );

      // Gentle floating animation for decorative orbs (continuous)
      gsap.to(".orb-1", {
        y: -20,
        x: 10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".orb-2", {
        y: 15,
        x: -15,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center h-[500px] sm:h-[550px] lg:h-[600px] mx-auto rounded-3xl bg-neutral-900 overflow-hidden shadow-2xl border border-neutral-800"
    >
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <video
          className="w-full h-full object-cover pointer-events-none"
          muted
          playsInline
          autoPlay
          loop
          id="mainVideo"
        >
          <source src="/assets/main-banner/bannervideo.webm" type="video/mp4" />
        </video>

        {/* Overlay for dark tint with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/85 to-black/90" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 sm:px-12 lg:px-16 max-w-5xl space-y-6">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/40 rounded-full backdrop-blur-sm"
        >
          <svg
            className="w-4 h-4 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-green-600 text-sm font-semibold tracking-wide">
            EXCLUSIVE IN PAKISTAN
          </span>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-white font-bold !mb-[10px] text-4xl sm:text-5xl lg:text-7xl leading-tight tracking-tight"
        >
          Custom Dye Solutions
          <span className="block text-green-600">Made Just For You</span>
        </h1>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-neutral-300 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-3xl"
        >
          We are the{" "}
          <span className="text-white font-semibold">
            only company in Pakistan
          </span>{" "}
          that offers
          <span className="text-green-600 font-semibold">
            {" "}
            custom dye colors
          </span>{" "}
          tailored to your exact specifications
        </p>

        {/* Feature Pills */}
        <div
          ref={pillsRef}
          className="flex flex-wrap items-center justify-center gap-3 pt-4"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-neutral-800/60 border border-neutral-700 rounded-full backdrop-blur-sm">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
            <span className="text-white text-sm font-medium">Any Color</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-neutral-800/60 border border-neutral-700 rounded-full backdrop-blur-sm">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-white text-sm font-medium">
              Premium Quality
            </span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-neutral-800/60 border border-neutral-700 rounded-full backdrop-blur-sm">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="text-white text-sm font-medium">
              Fast Production
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <Link href="/buy" className="no-underline">
          <button
            ref={ctaRef}
            className="!mt-3 px-8 py-3 bg-green-600 hover:bg-green-400 text-white font-semibold text-lg rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105"
          >
            Request Custom Colors
          </button>
        </Link>
      </div>

      {/* Decorative gradient orbs */}
      <div className="orb-1 absolute top-10 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
      <div className="orb-2 absolute bottom-10 right-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
    </div>
  );
};

export default Video;
