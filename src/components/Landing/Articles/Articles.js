"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Articles = () => {
  const textRef = useRef(null);
  const headerRef = useRef(null);
  const subtitleRef = useRef(null);
  const articlesContainerRef = useRef(null);

  const articles = [
    {
      id: 1,
      image: "/assets/articles/articl1.jpg",
      category: "Aluminium",
      readTime: "5 min read",
      title: "WHY ALUMINIUM FOIL SHINES",
      description:
        "Learn how aluminium foil outperforms plastic in various applications.",
      link: "https://www.foilonline.com/what-are-the-hidden-advantages-of-using-aluminum-foil-containers-for-food-storage/",
    },
    {
      id: 2,
      image: "/assets/articles/glasses.jpg",
      category: "Sustainability",
      readTime: "5 min read",
      title: "THE VERSATILITY OF FOIL",
      description: "Explore the many uses of aluminium foil in daily life.",
      link: "https://www.rd.com/list/over-40-new-uses-for-aluminum-foil/",
    },
    {
      id: 3,
      image: "/assets/articles/articl3.jpg",
      category: "Innovation",
      readTime: "5 min read",
      title: "ALUMINIUM VS. PLASTIC",
      description:
        "Understand why aluminium is a superior choice for packaging.",
      link: "https://www.wnapt.com/knowledge-center/blogs/5-benefits-of-aluminum-vs-plastic-you-need-to-know",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate "BLOG" label
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate "Explore" text
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate subtitle
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate article cards with stagger
      gsap.from(".article-card", {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: articlesContainerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="articles" className="bg-neutral-900 py-[80px]">
      <div className="custom-container mx-auto">
        <div className="text-center !mb-[60px]">
          <p
            ref={headerRef}
            className="text-[#FFF] text-sm font-light mb-2 tracking-wide"
          >
            BLOG
          </p>
          <h2 className="text-white text-[35px] md:!text-[45px] font-semibold leading-tight mb-4">
            <span
              ref={textRef}
              className="explore-span text-green-600 pr-[10px]"
            >
              Explore
            </span>
            Aluminium Foil
          </h2>
          <p ref={subtitleRef} className="text-gray-300 text-lg">
            Discover the benefits of aluminium foil
          </p>
        </div>

        <div
          ref={articlesContainerRef}
          className="flex gap-[30px] overflow-x-auto"
        >
          {articles.map((article) => (
            <div
              key={article.id}
              className="article-card flex-1 bg-[#1B1B1B] min-w-[300px] border border-gray-600 rounded-lg overflow-hidden cursor-pointer group shadow-lg"
            >
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative overflow-hidden">
                  <div className="relative w-full h-[300px]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="bg-[#f3f3f3] backdrop-blur-sm text-black text-xs font-medium px-3 py-1 rounded">
                      {article.category}
                    </span>
                    <span className="bg-[#f3f3f3] backdrop-blur-sm text-black text-xs font-medium px-3 py-1 rounded">
                      {article.readTime}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-white text-xl font-bold mb-3 group-hover:text-white transition-colors uppercase">
                    {article.title}
                  </h3>
                  <p className="text-gray-200 text-sm leading-relaxed mb-6">
                    {article.description}
                  </p>
                  <button className="text-white text-sm font-medium hover:text-white/70 transition-colors flex items-center gap-2">
                    Read more
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      <path
                        d="M6 12L10 8L6 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
