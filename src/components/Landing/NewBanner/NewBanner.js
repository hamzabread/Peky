"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AluminiumFoilSection() {
    const featuresRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Features animation timeline
            const featuresTl = gsap.timeline({
                scrollTrigger: {
                    trigger: featuresRef.current,
                    start: 'top 80%',
                    end: 'top 30%',
                    toggleActions: 'play none none reverse',
                }
            });

            featuresTl
                .from(featuresRef.current.children, {
                    y: 60,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out'
                })
                .from(featuresRef.current.querySelectorAll('svg'), {
                    scale: 0,
                    rotation: -180,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'back.out(1.7)'
                }, '-=0.6');

            // CTA buttons animation timeline
            const ctaTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: 'top 85%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse',
                }
            });

            ctaTl.from(ctaRef.current.children, {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power2.out'
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="bg-neutral-900 text-white py-10 lg:py-30">
            <div className="custom-container">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="grid md:grid-cols-2 md:gap-12 gap-8 !mb-10 md:!mb-20">
                        <div>
                            <p className="text-sm uppercase tracking-wider !mb-4 text-gray-400">QUALITY</p>
                            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight">
                                THE BENEFITS OF ALUMINIUM FOIL
                            </h1>
                        </div>
                        <div className="flex items-center">
                            <p className="text-gray-300 md:text-lg text-[14px] leading-relaxed">
                                Aluminium foil is renowned for its exceptional durability, making it a
                                reliable choice for various applications. Its heat resistance ensures that
                                it can withstand high temperatures without compromising its integrity.
                                Additionally, aluminium is eco-friendly, as it is fully recyclable and
                                reduces plastic waste.
                            </p>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div ref={featuresRef} className="grid md:grid-cols-3 gap-8 items-center !mb-10">
                        {/* Feature 1 */}
                        <div>
                            <div className="md:!mb-6 !mb-3">
                                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="8" y="16" width="32" height="20" rx="2" />
                                    <text x="14" y="30" fill="currentColor" stroke="none" fontSize="14" fontWeight="bold">HQ</text>
                                </svg>
                            </div>
                            <h3 className="md:text-2xl text-xl  font-bold !mb-3 uppercase">
                                UNMATCHED DURABILITY FOR EVERYDAY USE
                            </h3>
                            <p className="text-gray-400">
                                Our aluminium foil stands the test of time.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div>
                            <div className="md:!mb-6 !mb-3">
                                <svg
                                    className="w-12 h-12"
                                    viewBox="0 0 48 48"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M16 36c-2-3-2-7 0-10s2-7 0-10" />
                                    <path d="M24 36c-2-3-2-7 0-10s2-7 0-10" />
                                    <path d="M32 36c-2-3-2-7 0-10s2-7 0-10" />
                                </svg>
                            </div>
                            <h3 className="md:text-2xl text-xl font-bold !mb-3 uppercase">
                                SUPERIOR HEAT RESISTANCE FOR COOKING NEEDS
                            </h3>
                            <p className="text-gray-400">
                                It can handle high temperatures with ease.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div>
                            <div className="md:!mb-6 !mb-3">
                                <svg
                                    className='w-12 h-12'
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                >
                                    <path fill="white" d="M535.3 70.7C541.7 64.6 551 62.4 559.6 65.2C569.4 68.5 576 77.7 576 88L576 274.9C576 406.1 467.9 512 337.2 512C260.2 512 193.8 462.5 169.7 393.3C134.3 424.1 112 469.4 112 520C112 533.3 101.3 544 88 544C74.7 544 64 533.3 64 520C64 445.1 102.2 379.1 160.1 340.3C195.4 316.7 237.5 304 280 304L360 304C373.3 304 384 293.3 384 280C384 266.7 373.3 256 360 256L280 256C240.3 256 202.7 264.8 169 280.5C192.3 210.5 258.2 160 336 160C402.4 160 451.8 137.9 484.7 116C503.9 103.2 520.2 87.9 535.4 70.7z" />
                                </svg>
                            </div>
                            <h3 className="md:text-2xl text-xl font-bold !mb-3 uppercase">
                                ECO-FRIENDLY CHOICE FOR A SUSTAINABLE FUTURE
                            </h3>
                            <p className="text-gray-400">
                                Choose aluminium to help reduce plastic pollution.
                            </p>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div ref={ctaRef} className="flex flex-wrap gap-4">
                        <a href='#articles' className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-full text-white font-medium transition-colors">
                            Learn More
                        </a>
                        <Link href='/buy' className="px-8 py-3 bg-transparent hover:bg-neutral-800 rounded-full text-white font-medium transition-colors flex items-center gap-2">
                            Shop
                            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 4 L10 8 L6 12" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
