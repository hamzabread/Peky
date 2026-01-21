import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import Header from "../../components/Landing/Header/Header";
import Footer from "../../components/Landing/Footer/Footer";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function MeetTheDeveloperAmmar() {
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
    //cool
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
      "Python",
      "C/C++",
      "Java",
      "JavaScript",
      "SQL (PostgreSQL)",
      "HTML/CSS",
    ],
    "Frameworks & Libraries": [
      "FastAPI",
      "Flask",
      "Next.js",
      "TensorFlow",
      "Keras",
      "Prefect",
    ],
    "Tools & Technologies": [
      "Git",
      "Docker",
      "Supabase",
      "Firebase",
      "Hugging Face",
      "AWS Cognito",
      "OpenCV",
      "pandas",
    ],
    Specializations: [
      "Machine Learning",
      "MLOps",
      "Full-Stack Development",
      "Computer Vision",
      "Blockchain",
    ],
  };

  const projects = [
    {
      title: "Autonomous Stock Forecasting MLOps Platform",
      tech: "Next.js, FastAPI, Prefect, Hugging Face",
      description:
        "Engineered an end-to-end MLOps pipeline using Prefect to automate data ingestion, model retraining, and deployment. Implemented automated champion/challenger evaluation system with real-time Slack alerts.",
      icon: "📈",
    },
    {
      title: "Peky.pk – E-Commerce Platform",
      tech: "Flask, Next.js, PostgreSQL, AWS Cognito",
      description:
        "Developed a full-stack e-commerce platform for aluminum foil. Implemented secure authentication with AWS Cognito, payment processing, and coordinated seamless user experience across the stack.",
      link: "https://pekypk.com",
      icon: "🛒",
    },
    {
      title: "Football Manager DBMS App",
      tech: "Flask, PostgreSQL, Supabase, Firebase",
      description:
        "Created a full-stack football team manager with real-time database backup. Supported full CRUD functionality with undo operations and role-based views for coaches, players, and admins.",
      icon: "⚽",
    },
    {
      title: "Roman Numeral Classifier",
      tech: "Python, TensorFlow, CNN, OpenCV",
      description:
        "Built a CNN to classify handwritten Roman numerals from I to X. Preprocessed images using OpenCV and deployed the model with real-time predictions.",
      icon: "🔢",
    },
    {
      title: "Drone Path Planning System",
      tech: "Python, A*, matplotlib, Tkinter",
      description:
        "Implemented 3D path planning using the A* algorithm to find shortest paths through obstacles with interactive 3D visualization.",
      icon: "🚁",
    },
  ];

  const experience = [
    {
      title: "Backend Intern",
      company: "SiberKoza / 3FT — Blockchain Voting System",
      location: "NASTP-Rawalpindi",
      period: "Jun 2025 – Aug 2025",
      achievements: [
        "Developed Flask-based backend APIs for anonymous blockchain voting platform",
        "Implemented CNIC verification using OCR to extract and cross-validate identity data",
        "Integrated deep-learning facial recognition pipelines for face–CNIC matching",
        "Built secure multi-step authentication workflows in collaborative team environment",
      ],
    },
    {
      title: "Member and Event Organizer",
      company: "Association for Computing Machinery (ACM)",
      location: "University Chapter, Topi",
      period: "Oct 2022 – Present",
      achievements: [
        "Organized two ICPC programming contests and an International Coding Competition",
        "Coordinated Speed Programming Competition promoting algorithmic thinking",
        "Managed SoftCom event with hackathon and Capture The Flag (CTF) modules",
        "Led planning and logistics for cybersecurity challenges",
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
            <div className="max-w-7xl !mx-auto px-4 sm:px-6 lg:px-8">
              <div ref={heroRef} className="text-center space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                  Meet the <span className="text-green-600">Developer</span>
                </h1>
                <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl !mx-auto">
                  Innovating with AI and Full-Stack Development
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
                        src="/assets/ammar.jpeg"
                        alt="Ammar Riaz"
                        fill
                        className="object-cover"
                        // Optional: Use this if the image is "Above the Fold" (LCP element)
                      />
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-white">
                    Muhammad Ammar Riaz
                  </h2>
                  <p className="text-xl text-green-600 font-semibold">
                    AI & Full-Stack Developer
                  </p>

                  <div className="space-y-4 text-neutral-300">
                    <p className="text-lg leading-relaxed">
                      3rd Year B.Sc. student in Artificial Intelligence at GIKI,
                      specializing in MLOps, full-stack development, and
                      blockchain technologies. Passionate about building
                      intelligent systems that automate and optimize complex
                      workflows.
                    </p>
                    <p className="text-lg leading-relaxed">
                      Expert in developing end-to-end machine learning
                      pipelines, secure backend systems, and creating seamless
                      user experiences through modern web technologies.
                    </p>
                  </div>

                  {/* Contact Links */}
                  <div className="flex flex-wrap gap-4 !pt-4">
                    <a
                      href="mailto:ammarriaz736@gmail.com"
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
                      href="https://github.com/AmmarRiaz123"
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
                    <a
                      href="tel:+923276536621"
                      className="flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-lg transition-colors border border-neutral-700"
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      Call Me
                    </a>
                  </div>

                  {/* Download Resume */}
                  <a
                    href="assets/Resume.pdf"
                    download
                    className="inline-flex items-center gap-2 px-8 py-4 !mt-5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-lg transition-colors border-2 border-green-600 shadow-lg shadow-green-600/20"
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
            <div className="max-w-7xl !mx-auto px-4 sm:px-6 lg:px-8">
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
                      B.Sc. in Artificial Intelligence, 3rd Year
                    </p>
                    <p className="text-neutral-400">
                      Oct 2022 – Present | Topi, Pakistan
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
            <div className="max-w-7xl !mx-auto px-4 sm:px-6 lg:px-8">
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
                          {exp.company}
                        </p>
                        <p className="text-neutral-500 text-sm !mt-1">
                          {exp.location}
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
            <div className="max-w-7xl !mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="max-w-7xl !mx-auto px-4 sm:px-6 lg:px-8">
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
                    {project.link && (
                      <div className="flex gap-3">
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
                      </div>
                    )}
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
              className="max-w-4xl !mx-auto px-4 sm:px-6 lg:px-8 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white !mb-6">
                Let's Build Something{" "}
                <span className="text-green-600">Innovative</span> Together
              </h2>
              <p className="text-xl text-neutral-400 !mb-8">
                I'm passionate about AI, MLOps, and full-stack development.
                Let's collaborate on your next big idea!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:ammarriaz736@gmail.com"
                  className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Get In Touch
                </a>
                <a
                  href="assets/Resume.pdf"
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
