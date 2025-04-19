import React from "react";

const Announcement = () => {

  const announcements = [
    {
      title: "Important: Maintain Social Distancing",
      description: "In light of the ongoing situation, please remember to maintain social distancing at all times in school premises.",
      date: "2025-04-15",
    },
    {
      title: "Summer Camp Registration Open",
      description: "Register now for the upcoming summer camp! Activities include sports, arts, and science workshops.",
      date: "2025-04-14",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Announcements</h2>
      <div className="space-y-4">
        {announcements.map((announcement, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
              <span className="text-sm text-gray-500">{new Date(announcement.date).toLocaleDateString()}</span>
            </div>
            <p className="mt-2 text-gray-600">{announcement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
