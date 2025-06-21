import { ArrowRight, Rocket, Users, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import CourseSlide from "./CourseSlide";
import MentorCardSection from "./MentorCardSectiion";
import NeedHelpForm from "./NeedHelpForm";
import Footer from "./Footer";

const glowVariants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.25, 0.5, 0.25],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Home = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative bg-white dark:bg-zinc-950 overflow-hidden py-24 px-6 md:px-16 xl:px-28">
        {/* Glow Background */}
        <motion.div
          className="absolute w-[32rem] h-[32rem] bg-sky-400/30 dark:bg-sky-700/30 rounded-full -top-40 -left-40 blur-[160px]"
          variants={glowVariants}
          animate="animate"
        />
        <motion.div
          className="absolute w-[32rem] h-[32rem] bg-orange-400/30 dark:bg-orange-700/30 rounded-full -bottom-40 -right-40 blur-[160px]"
          variants={glowVariants}
          animate="animate"
        />

        {/* Tagline */}
        <div className="text-center relative z-10 mb-3">
          <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
            India’s Leading Career-Driven Internship Platform
          </p>
        </div>

        {/* Trust Badge */}
        <div className="text-center relative z-10 mb-5">
          <div className="inline-flex items-center justify-center space-x-2">
            <img src="/rating_star.svg" alt="Rating Star" className="h-5" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Trusted by <strong>15,000+</strong> students and professionals
            </p>
          </div>
        </div>

        {/* Hero Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl mx-auto relative z-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
            Power Your Career with{" "}
            <span className="bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
              Real-World Internships
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
            Get hands-on experience, personalized mentorship, and project-based
            certifications — all tailored for your job-ready journey.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/courses"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-600 to-blue-700 text-white font-semibold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              Explore Internships
            </motion.a>
            <a
              href="/success-stories"
              className="text-sky-600 dark:text-sky-400 hover:underline font-medium text-sm"
            >
              View Success Stories →
            </a>
          </div>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4 text-sky-500" />
              15,000+ Students Empowered
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-sky-500" />
              300+ Internship Tracks
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-500" />
              120+ Mentors & Instructors
            </div>
          </div>
        </motion.div>

        {/* Logos */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-10 relative z-10">
          {[
            { src: "/logos/iith.png", alt: "IIT Hyderabad" },
            { src: "/logos/microsoft.png", alt: "Microsoft" },
            { src: "/logos/amazon.png", alt: "Amazon" },
            { src: "/logos/google.png", alt: "Google" },
          ].map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              className="h-8 grayscale hover:grayscale-0 transition duration-300 ease-in-out"
            />
          ))}
        </div>
      </section>

      {/* Subsections */}
      <CourseSlide />
      <MentorCardSection />
      <NeedHelpForm />
      <Footer />
    </>
  );
};

export default Home;
