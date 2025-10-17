import Link from "next/link";
import Footer from "../../components/Landing/Footer/Footer";
import Header from "../../components/Landing/Header/Header";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SlotCounter = ({ value, label }) => {
  const counterRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!counterRef.current || hasAnimated.current) return;

    const digits = value.toString().split("");
    const container = counterRef.current;

    // Create slot machine effect
    const animation = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 90%",
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;

          digits.forEach((digit, index) => {
            const digitElement = container.children[index];
            if (!digitElement) return;

            const isNumber = !isNaN(digit);

            if (isNumber) {
              const finalNumber = parseInt(digit);
              const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

              // Shuffle and add final number
              const sequence = [...numbers, ...numbers, finalNumber];

              let currentIndex = 0;
              const interval = setInterval(() => {
                if (currentIndex < sequence.length - 1) {
                  digitElement.textContent = sequence[currentIndex];
                  currentIndex++;
                } else {
                  digitElement.textContent = finalNumber;
                  clearInterval(interval);
                }
              }, 50 + index * 10);
            }
          });
        },
      },
    });

    return () => {
      animation.kill();
    };
  }, [value]);

  return (
    <div className="text-center">
      <div
        ref={counterRef}
        className="text-4xl md:text-5xl font-bold text-green-600 !mb-2 flex justify-center items-center gap-1"
      >
        {value.split("").map((char, index) => (
          <span
            key={index}
            className="inline-block min-w-[0.6em] text-center"
            style={{
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <div className="text-neutral-400 text-sm md:text-base">{label}</div>
    </div>
  );
};

export default function AboutSection() {
  const sections = [
    {
      title: "Leading Aluminium Foil Manufacturer",
      description:
        "With the capacity to produce 500,000 packages daily, we distribute throughout Pakistan. Our commitment to quality and efficiency has made us the trusted choice for businesses and households across multiple provinces.",
      image: "/assets/author.webp",
      imageAlt: "Production machinery",
    },
    {
      title: "Trusted by Thousands Nationwide",
      description:
        "For over a decade, Peky has been synonymous with reliability and excellence in aluminium foil production. Our products are trusted by leading food service providers, restaurants, and households across Pakistan and internationally. We maintain the highest standards of quality control to ensure every roll meets our exacting specifications.",
      image: "/api/placeholder/600/400",
      imageAlt: "Quality products",
      reverse: true,
    },
    {
      title: "Expanding for Tomorrow",
      description:
        "Currently with an area of 2000m2 and in the expansion phase to a new production unit of 7000m2, more efficient, with greater production capacity and new cutting-edge technology. Our investment in the future ensures we continue to deliver premium products while maintaining competitive pricing and exceptional service.",
      image: "/api/placeholder/600/400",
      imageAlt: "Facility expansion",
    },
    {
      title: "Eco-Friendly & Sustainable",
      description:
        "At Peky, we're committed to sustainability. Aluminium foil is 100% recyclable and eco-friendly, making it a responsible choice for environmentally conscious consumers. Our manufacturing processes are designed to minimize waste and reduce our carbon footprint, ensuring a healthier choice for both your family and the planet.",
      image: "/api/placeholder/600/400",
      imageAlt: "Sustainable packaging",
      reverse: true,
    },
  ];

  const stats = [
    { number: "500K+", label: "Daily Production", animated: true },
    { number: "10+", label: "Years Experience", animated: true },
    { number: "1", label: "Countries", animated: false },
    { number: "7000m²", label: "New Facility Size", animated: false },
  ];

  return (
    <>
      <Header mainnav={true} />
      <section className="bg-black py-20">
        <div className="custom-container">
          <h1 className="text-green-600 text-center text-[60px] font-[700]">
            About Us
          </h1>
          <div className="!mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center !mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white !mb-4"></h2>
              <p className="text-neutral-400 text-lg max-w-2xl !mx-auto">
                Pakistan's premier manufacturer of premium aluminium foil
                products, delivering quality and innovation since day one.
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-24 flex flex-col gap-6 md:block">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                  } items-center gap-12`}
                >
                  {/* Text Content */}
                  <div className="flex-1 space-y-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                      {section.title}
                    </h3>
                    <p className="text-neutral-400 text-lg leading-relaxed">
                      {section.description}
                    </p>
                    {index === 0 && (
                      <div className="flex items-center gap-4 pt-4">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-6 h-6 text-green-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-white font-semibold">
                            ISO Certified
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-6 h-6 text-green-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-white font-semibold">
                            Trusted Since 2010
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Image */}
                  <div className="flex-1 w-full">
                    <div className="relative overflow-hidden hover:scale-105 transition-transform duration-500 rounded-lg shadow-2xl">
                      <div className="aspect-w-16 aspect-h-10 hover:scale-105 transition-transform duration-500  bg-neutral-900">
                        <Image
                          src={section.image}
                          alt={section.imageAlt || "Section image"}
                          width={550}
                          height={550}
                          className="h-[550px] w-full object-cover hover:scale-105 transition-transform duration-500"
                          priority={false}
                        />
                      </div>
                      <div className="absolute inset-0 ring-1 ring-inset ring-green-600/20 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Section with Slot Machine Animation */}
            <div className="!mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) =>
                stat.animated ? (
                  <SlotCounter
                    key={index}
                    value={stat.number}
                    label={stat.label}
                  />
                ) : (
                  <div key={index} className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-green-600 !mb-2">
                      {stat.number}
                    </div>
                    <div className="text-neutral-400 text-sm md:text-base">
                      {stat.label}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* CTA Section */}
            <div className="!mt-24 bg-neutral-900 rounded-2xl p-12 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white !mb-4">
                Ready to Experience the{" "}
                <span className="text-green-600">Peky</span> Difference?
              </h3>
              <p className="text-neutral-400 text-lg !mb-8 max-w-2xl !mx-auto">
                Join thousands of satisfied customers who trust Peky for their
                aluminium foil needs.
              </p>
              <Link
                href="/buy"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-300"
              >
                Buy Our Product
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
