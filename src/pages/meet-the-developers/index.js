import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import Header from "../../components/Landing/Header/Header";
import Footer from "../../components/Landing/Footer/Footer";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function MeetTheDeveloper() {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Hero section animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        },
      );
    }

    // Profile image animation
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0, rotation: -10 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
          delay: 0.3,
        },
      );
    }

    // Education section animation
    if (educationRef.current) {
      gsap.fromTo(
        educationRef.current.querySelector(".education-card"),
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: educationRef.current,
            start: "top 75%",
          },
        },
      );
    }

    // Experience section animation
    if (experienceRef.current) {
      const expCards = experienceRef.current.querySelectorAll(".exp-card");
      gsap.fromTo(
        expCards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: experienceRef.current,
            start: "top 70%",
          },
        },
      );
    }

    // Skills cards animation
    if (skillsRef.current) {
      const skillCards = skillsRef.current.querySelectorAll(".skill-card");
      gsap.fromTo(
        skillCards,
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        },
      );
    }

    // Projects animation
    if (projectsRef.current) {
      const projectCards =
        projectsRef.current.querySelectorAll(".project-card");
      gsap.fromTo(
        projectCards,
        { x: -100, opacity: 0, rotation: -2 },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 70%",
          },
        },
      );
    }

    // CTA section animation
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
          },
        },
      );
    }
  }, []);

  const skills = {
    "Programming Languages": [
      "C#",
      "JavaScript (ES6+)",
      "Python",
      "C++",
      "SQL (Postgres)",
    ],
    "Frameworks & Libraries": [
      ".NET Core",
      "ASP.NET Web API",
      "React",
      "Next.js",
      "FastAPI",
      "Flask",
      "MERN Stack",
    ],
    "Tools & Methodologies": [
      "Agile Development",
      "ORM",
      "Docker",
      "Git",
      "AWS",
      "MQTT",
      "Microservices",
    ],
    "Core Competencies": [
      "Technical Leadership",
      "System Architecture",
      "Full-Stack Development",
      "Data Persistence",
    ],
  };

  const projects = [
    {
      title: "Peky E-commerce",
      tech: "Next.js, AWS Cognito, Tailwind, Railway, PostgreSQL",
      description:
        "Engineered a full-stack authentication system with AWS Cognito, yielding a 20% increase in secure registration throughput. Optimized user conversion by 12% through Server-Side Rendering (SSR).",
      link: "https://pekypk.com",
      github: "https://github.com/hamzabread/Peky",
      icon: "🛒",
    },
    {
      title: "IoT-Enabled Inventory System",
      tech: "C#, .NET 9, Microservices, MQTT, PostgreSQL",
      description:
        "Architected a real-time IoT backend using ORM via EF Core, reducing data persistence latency by 25%. Secured 99.9% system uptime.",
      github: "https://github.com/hamzabread/InventorySystem",
      icon: "📦",
    },
    {
      title: "Cambfordable: Live EdTech Platform",
      tech: "Next.js, FastAPI, PostgreSQL, Zoom SDK, JWT",
      description:
        "Developed a live-streaming platform supporting 50+ concurrent participants via Zoom SDK with zero session interruptions.",
      link: "https://cambfordable.com",
      github: "https://github.com/hamzabread/cambfordable",
      icon: "🎓",
    },
    {
      title: "Smart Attendance System",
      tech: "FastAPI, React Native, Face Recognition AI, Docker",
      description:
        "Constructed a computer vision pipeline achieving 92% identity detection accuracy. Reduced manual entry time by 80%.",
      github: "https://github.com/hamzabread/smart-attendance",
      icon: "👤",
    },
  ];

  const experience = [
    {
      title: "Frontend Developer",
      company: "Quecko",
      period: "Aug 2025 – Present",
      type: "Part-time",
      achievements: [
        "Spearheaded Frontend Architecture achieving 30% performance improvement",
        "Reduced technical debt by 15% through legacy code refactoring",
        "Delivered 5+ production projects on Upwork with 100% satisfaction",
      ],
    },
    {
      title: "Frontend Developer Intern",
      company: "Quecko",
      period: "May 2025 – Aug 2025",
      type: "Internship",
      achievements: [
        "Debugged and resolved 40+ high-priority tickets",
        "Maintained 100% on-time delivery rate for platform features",
      ],
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-600/10 to-transparent"></div>

          <div className="custom-container relative z-10">
            <div className="max-w-7xl !mx-auto px-0 sm:px-6 lg:px-8">
              <div ref={heroRef} className="text-center space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                  Meet the <span className="text-green-600">Developer</span>
                </h1>
                <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl !mx-auto">
                  Building scalable solutions with modern technology
                </p>
              </div>

              {/* Profile Section */}
              <div className="!mt-16 grid lg:grid-cols-2 gap-12 items-center">
                {/* Profile Image */}
                <div ref={imageRef} className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-600 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
                    <div className="relative w-80 h-80 bg-neutral-900 rounded-2xl border-4 border-green-600 overflow-hidden shadow-2xl shadow-green-600/30">
                      <Image
                        src="/assets/me.png"
                        alt="Hamza Elahi"
                        fill
                        className="object-cover"
                         // Optional: Use this if the image is "Above the Fold" (LCP element)
                      />
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-white">Hamza Elahi</h2>
                  <p className="text-xl text-green-600 font-semibold">
                    Software Developer
                  </p>

                  <div className="space-y-4 text-neutral-300">
                    <p className="text-lg leading-relaxed">
                      Software Developer and Computer Science student at GIKI,
                      focused on Information Technology and Computer
                      Engineering. Specialized in developing scalable web and
                      IoT solutions using modern programming languages in Agile
                      development environments.
                    </p>
                    <p className="text-lg leading-relaxed">
                      Technical expertise includes system architecture and
                      data-driven optimization of engineering workflows.
                    </p>
                  </div>

                  {/* Contact Links */}
                  <div className="flex flex-wrap gap-4 !pt-4">
                    <a
                      href="mailto:hamzaval2000@gmail.com"
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Email Me
                    </a>
                    <a
                      href="https://linkedin.com/in/hamza-elahi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-lg transition-colors border border-neutral-700"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/hamzabread"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-lg transition-colors border border-neutral-700"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  </div>

                  {/* Download Resume */}
                  <a
                    href="/assets/HamzaElahiresume.pdf"
                    download
                    className="inline-flex items-center !mt-5 gap-2 px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-lg transition-colors border-2 border-green-600 shadow-lg shadow-green-600/20"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section ref={educationRef} className="py-16 bg-neutral-900/50">
          <div className="custom-container">
            <div className="max-w-7xl !mx-auto px-0 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white !mb-8">
                <span className="text-green-600">Education</span>
              </h2>
              <div className="education-card bg-black rounded-2xl p-8 border border-neutral-800">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center text-2xl">
                    🎓
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white !mb-2">
                      Ghulam Ishaq Khan Institute (GIKI)
                    </h3>
                    <p className="text-green-600 font-semibold !mb-2">
                      BS in Computer Science (Specialization in Artificial
                      Intelligence)
                    </p>
                    <p className="text-neutral-400">
                      Sep 2023 – May 2027 | Swabi, Pakistan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section ref={experienceRef} className="py-16">
          <div className="custom-container">
            <div className="max-w-7xl !mx-auto px-0 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white !mb-8">
                <span className="text-green-600">Experience</span>
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="exp-card bg-neutral-900 rounded-2xl p-8 border border-neutral-800 hover:border-green-600/50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between !mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white !mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-green-600 font-semibold">
                          {exp.company} • {exp.type}
                        </p>
                      </div>
                      <span className="text-neutral-400 !mt-2 md:!mt-0">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-neutral-300"
                        >
                          <svg
                            className="w-5 h-5 text-green-600 flex-shrink-0 !mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section ref={skillsRef} className="py-16 bg-neutral-900/50">
          <div className="custom-container">
            <div className="max-w-7xl !mx-auto px-0 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white !mb-12 text-center">
                Technical <span className="text-green-600">Skills</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(skills).map(([category, items], index) => (
                  <div
                    key={index}
                    className="skill-card bg-black rounded-2xl p-8 border border-neutral-800 hover:border-green-600/50 transition-colors"
                  >
                    <h3 className="text-xl font-bold text-green-600 !mb-4">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-neutral-900 text-neutral-300 rounded-lg text-sm border border-neutral-800 hover:border-green-600 hover:text-green-600 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section ref={projectsRef} className="py-16">
          <div className="custom-container">
            <div className="max-w-7xl !mx-auto px-0 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white !mb-12 text-center">
                Key <span className="text-green-600">Projects</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="project-card bg-neutral-900 rounded-2xl p-8 border border-neutral-800 hover:border-green-600/50 transition-all hover:shadow-lg hover:shadow-green-600/10"
                  >
                    <div className="text-4xl !mb-4">{project.icon}</div>
                    <h3 className="text-2xl font-bold text-white !mb-2">
                      {project.title}
                    </h3>
                    <p className="text-green-600 text-sm font-semibold !mb-4">
                      {project.tech}
                    </p>
                    <p className="text-neutral-300 leading-relaxed !mb-6">
                      {project.description}
                    </p>
                    <div className="flex gap-3">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-semibold"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors text-sm font-semibold border border-neutral-700"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-neutral-900/50">
          <div className="custom-container">
            <div
              ref={ctaRef}
              className="max-w-4xl !mx-auto px-0 sm:px-6 lg:px-8 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white !mb-6">
                Let's Build Something{" "}
                <span className="text-green-600">Amazing</span> Together
              </h2>
              <p className="text-xl text-neutral-400 !mb-8">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:hamzaval2000@gmail.com"
                  className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Get In Touch
                </a>
                <a
                  href="/assets/HamzaElahiresume.pdf"
                  download
                  className="px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-lg transition-colors border border-green-600"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
