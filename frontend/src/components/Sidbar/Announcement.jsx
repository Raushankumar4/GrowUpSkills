import React from "react";
import { Megaphone, CalendarDays, BadgeCheck } from "lucide-react";

const Announcement = () => {
  const announcements = [
    {
      title: "Internship Selection Results Declared!",
      description:
        "Check your dashboard to see if you've been selected for the June Internship batch. Congratulations to all selected students!",
      date: "2025-06-15",
      icon: (
        <BadgeCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
      ),
    },
    {
      title: "New Internship Batches Starting Soon",
      description:
        "Get ready for our July batch of internships. Registrations are now open on the SkillHub portal. Limited seats available!",
      date: "2025-06-12",
      icon: (
        <CalendarDays className="w-6 h-6 text-purple-600 dark:text-purple-400" />
      ),
    },
    {
      title: "Boost Your Resume: Certificate Update",
      description:
        "Your internship certificates are now available for download under your profile section. Add it to your LinkedIn and resume today!",
      date: "2025-06-10",
      icon: <Megaphone className="w-6 h-6 text-sky-600 dark:text-sky-300" />,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-10">
        📢 SkillHub <span className="text-sky-600">Announcements</span>
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {announcements.map((announcement, index) => (
          <div
            key={index}
            className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md border border-sky-200 dark:border-zinc-700 hover:shadow-xl transition-all h-full flex flex-col justify-between"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-sky-100 dark:bg-sky-900 p-3 rounded-full">
                {announcement.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white leading-snug">
                  {announcement.title}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(announcement.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {announcement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
