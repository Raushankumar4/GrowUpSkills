import React, { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import axiosInstance from "@/Axios/AxiosInstance";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.text = "";
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 24;
defaults.plugins.title.color = "black";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const getMonthYearLabel = (month, year) => `${monthNames[month - 1]} ${year}`;

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 200);
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);
  return `rgba(${r}, ${g}, ${b}, 0.7)`;
};

export default function MonthlyEnrollmentsChartByCourse() {
  const [chartLabels, setChartLabels] = useState([]);
  const [chartDatasets, setChartDatasets] = useState([]);

  const fetchEnrollmentData = async () => {
    try {
      const res = await axiosInstance.get("enroll-student");
      if (Array.isArray(res?.data)) {
        const { labels, datasets } = processData(res.data);
        setChartLabels(labels);
        setChartDatasets(datasets);
      }
    } catch (err) {
      console.log("Error fetching enrollment data:", err);
    }
  };

  useEffect(() => {
    fetchEnrollmentData();
  }, []);

  const processData = (rawData) => {
    const labelSet = new Set();
    const courseMap = {}; 

    rawData.forEach(({ courseTitle, month, year, count }) => {
      const label = getMonthYearLabel(month, year);
      labelSet.add(label);

      if (!courseMap[courseTitle]) {
        courseMap[courseTitle] = {};
      }
      courseMap[courseTitle][label] = (courseMap[courseTitle][label] || 0) + count;
    });

    const sortedLabels = Array.from(labelSet).sort((a, b) => {
      const [aMonth, aYear] = a.split(" ");
      const [bMonth, bYear] = b.split(" ");
      const aIndex = monthNames.indexOf(aMonth);
      const bIndex = monthNames.indexOf(bMonth);
      return new Date(aYear, aIndex) - new Date(bYear, bIndex);
    });

    const datasets = Object.entries(courseMap).map(([title, dataMap]) => {
      const data = sortedLabels.map(label => dataMap[label] || 0);
      return {
        label: title,
        data,
        backgroundColor: getRandomColor(),
      };
    });

    return { labels: sortedLabels, datasets };
  };

  const chartData = {
    labels: chartLabels,
    datasets: chartDatasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Enrollments by Course (with Year)",
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        beginAtZero: true,
        stacked: true,
        title: {
          display: true,
          text: 'Enrollments',
        },
      },
    },
  };

  return (
    <div className="p-4">
      <div className="h-[50vh] w-full">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}
