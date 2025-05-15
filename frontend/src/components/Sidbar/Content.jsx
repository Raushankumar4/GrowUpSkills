import React from "react";
import DasboardContent from "./DasboardContent";
import Announcement from "./Announcement";
import MyCourse from "./MyCourse";
import MyPurchase from "../User/MyPurchase";
import MyCertificates from "../User/MyCertificates";
import Exam from "../User/Exam";

const Content = ({ active }) => {
  return (
    <div className="p-8 flex-1 bg-white min-h-screen">
      
      {active === "Dashboard" && (
        <DasboardContent />
      )}
      {active === "Announcements" && (
        <Announcement />
      )}
      {active === "My Courses" && (
        <MyCourse />
      )}
      {active === "My Purchases" && (
        <MyPurchase />
      )}
      {active === "Certificates" && (
        <MyCertificates />
      )}
      {active === "Exams" && (
        <Exam />
      )}
    </div>
  );
};

export default Content;
