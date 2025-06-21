import { FaLinkedin, FaBriefcase, FaChalkboardTeacher } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const mentors = [
  {
    name: "Ekta Negi",
    role: "Data Scientist",
    companies: ["/assets/fractal.png", "/assets/deloitte.png"],
    workExp: "5+ Years",
    teachExp: "3+ Years",
    linkedin: "#",
    image: "/assets/ekta.png",
    description:
      "Senior Data Scientist at Fractal: Specializes in leveraging AI for business solutions, with...",
  },
  {
    name: "Ajay Kumar Gupta",
    role: "Senior Data Scientist",
    companies: ["/assets/novartis.png"],
    workExp: "5+ Years",
    teachExp: "4+ Years",
    linkedin: "#",
    image: "/assets/ajay.png",
    description:
      "Senior Data Scientist, Synopsys, Ex-Novartis, 4 years of experience",
  },
  {
    name: "Gaurav Thadani",
    role: "Senior Software Developer",
    companies: ["/assets/hcl.png"],
    workExp: "5+ Years",
    teachExp: "2+ Years",
    linkedin: "#",
    image: "/assets/gaurav.png",
    description: "5 Yrs Mentoring and Teaching MERN Stack",
  },
  {
    name: "Raushan kumar",
    role: "Senior Software Developer",
    companies: ["/assets/hcl.png"],
    workExp: "5+ Years",
    teachExp: "2+ Years",
    linkedin: "#",
    image: "/assets/gaurav.png",
    description: "5 Yrs Mentoring and Teaching MERN Stack",
  },
];

const MentorCard = ({ mentor }) => (
  <div className="bg-white/90 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-[320px] overflow-hidden">
    <div className="bg-gradient-to-tr from-[#c9ebff] to-[#e4f2ff] dark:from-sky-900 dark:to-zinc-900 h-56 flex items-center justify-center relative">
      <img
        src={mentor.image}
        alt={mentor.name}
        className="h-36 w-36 object-cover rounded-full border-4 border-white dark:border-zinc-900 shadow-md z-10"
      />
    </div>

    <div className="p-5 space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
          {mentor.name}
        </h3>
        <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-lg" />
        </a>
      </div>

      <p className="text-sm text-gray-600 dark:text-zinc-400">{mentor.role}</p>

      <div className="flex gap-3 flex-wrap items-center pt-1">
        {mentor.companies.map((logo, idx) => (
          <div
            key={idx}
            className="bg-gray-100 dark:bg-zinc-800 rounded-full p-1 shadow-sm"
          >
            <img src={logo} alt="company" className="h-5 w-auto" />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap text-sm text-gray-600 dark:text-zinc-300 gap-4 pt-1">
        <span className="flex items-center gap-2">
          <FaBriefcase /> {mentor.workExp}
        </span>
        <span className="flex items-center gap-2">
          <FaChalkboardTeacher /> {mentor.teachExp}
        </span>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
        {mentor.description}
      </p>
    </div>
  </div>
);

const MentorsSection = () => (
  <section className="px-4 md:px-12 py-16 bg-sky-50 dark:bg-zinc-950 transition-colors duration-300">
    <div className="max-w-7xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-12">
        <span className="bg-pink-100 dark:bg-pink-800 text-black dark:text-white px-5 border border-pink-300 dark:border-pink-700 py-1 rounded-full text-sm font-semibold">
          Game Changers
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-4 text-zinc-900 dark:text-white">
          Meet our{" "}
          <span className="underline text-yellow-400 decoration-2 underline-offset-4">
            Mentors
          </span>
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center">
        {mentors.map((mentor, idx) => (
          <MentorCard key={idx} mentor={mentor} />
        ))}
      </div>

      {/* Mobile Arrows */}
      <div className="flex justify-center mt-10 gap-4 md:hidden">
        <button className="p-3 rounded-full bg-white dark:bg-zinc-900 shadow hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
          <IoIosArrowBack className="text-gray-800 dark:text-white" size={20} />
        </button>
        <button className="p-3 rounded-full bg-white dark:bg-zinc-900 shadow hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
          <IoIosArrowForward
            className="text-gray-800 dark:text-white"
            size={20}
          />
        </button>
      </div>
    </div>
  </section>
);

export default MentorsSection;
