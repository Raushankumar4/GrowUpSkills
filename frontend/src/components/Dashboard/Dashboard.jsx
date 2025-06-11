import { useState } from 'react';
import {
  FaBookOpen,
  FaUsers,
  FaChalkboardTeacher,
  FaDollarSign,
  FaChartBar,
  FaBell
} from 'react-icons/fa';
import MonthlySignupsChart from '../Admin/Charts/MonthlySignupsChart';
import MonthlyEnrollmentsChart from '../Admin/Charts/MonthlyEnrollmentsChart';

export default function Dashboard() {
  const [metrics] = useState({
    courses: 25,
    students: 342,
    instructors: 12,
    revenue: '$12,450',
  });

  const recentCourses = [
    { title: 'React for Beginners', instructor: 'John Doe', date: '2025-05-10' },
    { title: 'Advanced Node.js', instructor: 'Jane Smith', date: '2025-05-08' },
    { title: 'Intro to Python', instructor: 'Mike Johnson', date: '2025-05-06' },
  ];

  const recentActivities = [
    { user: 'Alice', action: 'enrolled in React for Beginners', time: '2 hours ago' },
    { user: 'Bob', action: 'completed Advanced Node.js', time: '1 day ago' },
    { user: 'Charlie', action: 'started Intro to Python', time: '3 days ago' },
  ];

  const notifications = [
    { message: 'New course "Advanced React" is now live!', time: 'Just now' },
    { message: 'Instructor "Jane Smith" updated course "Advanced Node.js".', time: '2 hours ago' },
    { message: 'Student "Alice" completed course "React for Beginners".', time: '1 day ago' },
  ];

  return (
    <>
      <div >
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>

        {/* Metrics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard label="Total Courses" value={metrics.courses} icon={<FaBookOpen className="h-6 w-6 text-blue-500" />} />
          <MetricCard label="Total Students" value={metrics.students} icon={<FaUsers className="h-6 w-6 text-green-500" />} />
          <MetricCard label="Instructors" value={metrics.instructors} icon={<FaChalkboardTeacher className="h-6 w-6 text-yellow-500" />} />
          <MetricCard label="Revenue" value={metrics.revenue} icon={<FaDollarSign className="h-6 w-6 text-red-500" />} />
        </div>

        {/* Charts Section */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="shadow-lg rounded-lg p-4 bg-white">
            <MonthlySignupsChart />
          </div>
          <div className="shadow-lg rounded-lg p-4 bg-white">
            <MonthlyEnrollmentsChart />
          </div>
        </div>

        {/* Recent Courses */}
        <Section title="📘 Recent Courses">
          <Table data={recentCourses} columns={['Course Title', 'Instructor', 'Date']} />
        </Section>

        {/* Recent Activities */}
        <Section title="🕒 Recent Activities">
          <ul className="space-y-2">
            {recentActivities.map((activity, index) => (
              <li key={index} className="flex justify-between text-gray-700">
                <span>{activity.user} {activity.action}</span>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Notifications */}
        <Section title="🔔 Notifications">
          <NotificationPanel notifications={notifications} />
        </Section>
      </div>
    </>
  );
}

function MetricCard({ label, value, icon }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Table({ data, columns }) {
  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            {columns.map((col, index) => (
              <th key={index} className="py-2 px-4 text-left text-gray-700">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              {Object.values(item).map((value, idx) => (
                <td key={idx} className="py-2 px-4 text-gray-700">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NotificationPanel({ notifications }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <ul className="space-y-2">
        {notifications.map((note, index) => (
          <li key={index} className="flex justify-between text-gray-700">
            <span><FaBell className="inline mr-2 text-blue-500" />{note.message}</span>
            <span className="text-sm text-gray-500">{note.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
