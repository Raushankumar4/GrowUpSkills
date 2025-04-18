import React from "react";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-4 space-y-4">
        <h1 className="text-2xl font-bold">ERP SVSU</h1>
        <nav className="space-y-2">
          <a href="#" className="block hover:text-blue-400">Student Dashboard</a>
          <a href="#" className="block hover:text-blue-400">Student Fee</a>
          <a href="#" className="block hover:text-blue-400">Examination</a>
          <a href="#" className="block hover:text-blue-400">LMS</a>
          <a href="#" className="block hover:text-blue-400">Covid Vaccine Certificate</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Student Dashboard</h2>
            <p className="text-blue-600 font-medium">SUBHARTI INSTITUTE OF TECHNOLOGY AND ENGINEERING</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-medium">RAUSHAN KUMAR</span>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-400">
              <img src="/avatar.jpg" alt="RAUSHAN KUMAR" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img src="/avatar.jpg" alt="RAUSHAN KUMAR" className="w-full h-full object-cover" />
            </div>
            <div className="mt-4 text-sm text-center">
              <p className="font-semibold">Program: BACHELOR OF TECHNOLOGY</p>
              <p>Specialization: INFORMATION TECHNOLOGY</p>
              <p>Name: RAUSHAN KUMAR</p>
              <p>Father's Name: SUNIL PRASAD</p>
              <p>Enrolment No: 2101000004867</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-2">Online Exam</h3>
            <div className="bg-cyan-400 p-2 rounded">Examination Form</div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-2">Access LMS</h3>
            <div className="space-y-1 bg-cyan-400 p-2 rounded">
              <p>E-Content</p>
              <p>Digital Library</p>
              <p>Open AccessForm</p>
              <p>InstitutionalMembership</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-2">Online Payment</h3>
            <div className="space-y-1 bg-cyan-400 p-2 rounded">
              <p>Fee Deposits</p>
              <p>Internet Payment</p>
              <p>Gym Payment</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-2">Attendance</h3>
            <div className="bg-cyan-400 p-2 rounded">View Attendance</div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-2">Student Complaint</h3>
            <div className="bg-cyan-400 p-2 rounded space-y-1">
              <p>Go To Complaint</p>
              <p>No Dues Apply</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-2">Notice Board</h3>
            <p className="text-blue-500 underline">Subharti Pulse October 2022</p>
            <p className="font-semibold mt-2">📄 Examination</p>
            <p>Accidental Insurance Policy for Students <span className="text-xs bg-blue-200 rounded px-1">2019-07-06</span></p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-2">Online Classes Schedule</h3>
            <div className="h-32 overflow-y-auto border rounded p-2">
              <label className="block">
                <input type="checkbox" className="mr-2" /> ALL University Schedule
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
