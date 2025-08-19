"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Benifits = () => {
  const containerRef = useRef(null);

useEffect(() => {
  if (typeof window !== "undefined") {
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      // Setup responsive breakpoints
      const mm = gsap.matchMedia();

      mm.add(
        {
          // Tailwind-like breakpoints
          isMobile: "(max-width: 640px)",
          isTablet: "(min-width: 641px) and (max-width: 1024px)",
          isDesktop: "(min-width: 1025px)",
        },
        (context) => {
          const { isMobile, isTablet, isDesktop } = context.conditions;

          gsap.utils.toArray(".animate-on-scroll").forEach((el) => {
            gsap.fromTo(
              el,
              { 
                x: isMobile ? -40 : isTablet ? -70 : -100, // smaller shift on mobile
                opacity: 0 
              },
              {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 100%", 
                  toggleActions: "play none none reverse",
                },
              }
            );
          });
        }
      );
    });
  }
}, []);


  return (
    <section
      id="About"
      ref={containerRef}
      className="bg-[#FFF] pt-[50px] py-[100px] lg:py-[150px] relative"
    >
      <div className="custom-container">
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-center max-w-[450px] z-10">
            <h2 className=" text-[35px] md:!text-[45px] leading-[100%] font-bold !mb-[35px]">
              <span className="text-green-700">Benifits</span> of Aluminium Foil
              Over Plastic
            </h2>
            <p className="text-[16px] md:!text-[20px] leading-[120%]">
              Aluminium foil is a safer choice for your health, as it doesn't
              leach harmful chemicals into food.{" "}
              <span className="block !mt-[10px]">
                Additionally, it offers a lower environmental impact compared to
                plastic, making it a sustainable option.
              </span>
            </p>

            {/* These divs will animate left to right */}
            <div className="!mt-[20px] flex gap-[10px] items-center animate-on-scroll">
              <svg
                height="20px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <path d="M272.5 96C272.5 78.3 286.8 64 304.5 64L336.5 64C354.2 64 368.5 78.3 368.5 96L368.5 236.9L490.5 166.5C505.8 157.7 525.4 162.9 534.2 178.2L550.2 205.9C559 221.2 553.8 240.8 538.5 249.6L416.5 320L538.5 390.4C553.8 399.2 559.1 418.8 550.2 434.1L534.2 461.8C525.4 477.1 505.8 482.4 490.5 473.5L368.5 403.1L368.5 544C368.5 561.7 354.2 576 336.5 576L304.5 576C286.8 576 272.5 561.7 272.5 544L272.5 403.1L150.5 473.5C135.2 482.3 115.6 477.1 106.8 461.8L90.8 434.1C82 418.8 87.2 399.2 102.5 390.4L224.5 320L102.5 249.6C87.2 240.8 82 221.2 90.8 205.9L106.8 178.2C115.6 162.9 135.2 157.7 150.5 166.5L272.5 236.9L272.5 96z" />
              </svg>
              <p className="text-[14px] md:!text-[16px]">
                Healthier food storage without harmful chemicals.
              </p>
            </div>

            <div className="flex items-center gap-[10px] !mt-[10px] animate-on-scroll">
              <svg
                height="20px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <path d="M535.3 70.7C541.7 64.6 551 62.4 559.6 65.2C569.4 68.5 576 77.7 576 88L576 274.9C576 406.1 467.9 512 337.2 512C260.2 512 193.8 462.5 169.7 393.3C134.3 424.1 112 469.4 112 520C112 533.3 101.3 544 88 544C74.7 544 64 533.3 64 520C64 445.1 102.2 379.1 160.1 340.3C195.4 316.7 237.5 304 280 304L360 304C373.3 304 384 293.3 384 280C384 266.7 373.3 256 360 256L280 256C240.3 256 202.7 264.8 169 280.5C192.3 210.5 258.2 160 336 160C402.4 160 451.8 137.9 484.7 116C503.9 103.2 520.2 87.9 535.4 70.7z" />
              </svg>
              <p className="text-[14px] md:!text-[16px]">
                Eco-friendly choice that reduces plastic waste.
              </p>
            </div>

            <div className="flex items-center gap-[10px] !mt-[10px] animate-on-scroll">
              <svg
                height="20px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <path d="M127.9 78.4C127.1 70.2 120.2 64 112 64C103.8 64 96.9 70.2 96 78.3L81.9 213.7C80.6 219.7 80 225.8 80 231.9C80 277.8 115.1 315.5 160 319.6L160 544C160 561.7 174.3 576 192 576C209.7 576 224 561.7 224 544L224 319.6C268.9 315.5 304 277.8 304 231.9C304 225.8 303.4 219.7 302.1 213.7L287.9 78.3C287.1 70.2 280.2 64 272 64C263.8 64 256.9 70.2 256.1 78.4L242.5 213.9C241.9 219.6 237.1 224 231.4 224C225.6 224 220.8 219.6 220.2 213.8L207.9 78.6C207.2 70.3 200.3 64 192 64C183.7 64 176.8 70.3 176.1 78.6L163.8 213.8C163.3 219.6 158.4 224 152.6 224C146.8 224 142 219.6 141.5 213.9L127.9 78.4zM512 64C496 64 384 96 384 240L384 352C384 387.3 412.7 416 448 416L480 416L480 544C480 561.7 494.3 576 512 576C529.7 576 544 561.7 544 544L544 96C544 78.3 529.7 64 512 64z" />
              </svg>
              <p className="text-[14px] md:!text-[16px]">
                Cost-effective solution for everyday cooking needs.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex !mt-[30px] pr-[50px] justify-center w-full">
        <img
          className="h-[150px] sm:h-[200px] absolute bottom-[50px] right-[50px] md:h-[300px] lg:h-[500px] rounded-[1000px] md:absolute md:top-[200px] md:right-0 lg:top-[200px] lg:right-0"
          src="/assets/Benifits2.jpeg"
          alt=""
        />
        <img
          className="h-[220px] sm:h-[270px] md:h-[330px] lg:h-[530px] rounded-[1000px] md:absolute md:top-[30px] md:right-[200px] lg:top-[0px] lg:right-[250px]"
          src="/assets/Benifits.png"
          alt=""
        />
      </div>
    </section>
  );
};

export default Benifits;
