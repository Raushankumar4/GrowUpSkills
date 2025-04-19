import React from "react";
import DasboardContent from "./DasboardContent";
import Announcement from "./Announcement";
import MyCourse from "./MyCourse";

const Content = ({ active }) => {
  return (
    <div className="p-8 flex-1 bg-white min-h-screen">
      {active === "Dashboard" && (
        <DasboardContent />
      )}
      {active === "Announcements" && (
       <Announcement/>
      )}
       {active === "My Courses" && (
       <MyCourse/>
      )}
    </div>
  );
};

export default Content;
