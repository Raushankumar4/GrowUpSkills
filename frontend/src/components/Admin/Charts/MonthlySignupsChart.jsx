import { useEffect, useState } from 'react';
import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import {
  Bar,
  Line,
  Doughnut,
  PolarArea,
  Radar,
  Scatter,
  Pie,
} from "react-chartjs-2";
import axiosInstance from '@/Axios/AxiosInstance';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.text = "";
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 24;
defaults.plugins.title.color = "black";

export default function MonthlySignupsChart() {
  const [signupData, setSignupData] = useState(Array(12).fill({ count: 0, students: [] }));

  const monthLabels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const rotateToStartFrom = (array, startIndex) => {
    return [...array.slice(startIndex), ...array.slice(0, startIndex)];
  };

  const fetchMonthlySignup = async () => {
    try {
      const res = await axiosInstance.get('getMonthlyStudentSignups');
      if (Array.isArray(res?.data)) {
        setSignupData(res.data);
      }
    } catch (err) {
      console.log('Error fetching student signups:', err);
    }
  };

  useEffect(() => {
    fetchMonthlySignup();
  }, []);

  const currentMonthIndex = new Date().getMonth();
  const rotatedLabels = rotateToStartFrom(monthLabels, currentMonthIndex);
  const rotatedData = rotateToStartFrom(signupData, currentMonthIndex);

  const chartData = {
    labels: rotatedLabels,
    datasets: [
      {
        label: 'Student Signups',
        data: rotatedData.map(item => item.count),
        backgroundColors: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(199, 199, 199, 0.7)',
          'rgba(83, 102, 255, 0.7)',
          'rgba(255, 99, 255, 0.7)',
          'rgba(99, 255, 132, 0.7)',
          'rgba(255, 132, 0, 0.7)',
          'rgba(0, 132, 255, 0.7)',
        ]

      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Monthly Student Signups'
      },
      tooltip: {
        callbacks: {
          afterLabel: function (tooltipItem) {
            const students = rotatedData[tooltipItem.dataIndex]?.students || [];
            return students.length > 0 ? `Usernames: ${students.join(', ')}` : 'No users';
          }
        }
      }

    }
  };

  return (
    <div className="p-4">
      <div className="h-[50vh] w-full">
        <Pie
          data={chartData}
          options={options}
        />
      </div>
    </div>
  );
}
