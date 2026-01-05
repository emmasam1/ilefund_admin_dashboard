import React from "react";
import { Progress, Avatar, Table, Card } from "antd";

import users from "/images/icons/users.png";
import estate from "/images/icons/dash-estate.png";
import revenue from "/images/icons/revenue.png";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// 1. MUST register the necessary components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const customerData = [
  950, 1080, 1200, 1150, 1050, 1100, 1170, 1030, 1070, 1200, 1100, 980,
];
const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const DARK_BLUE = "#001f52";

// 2. Chart Data Object
const chartData = {
  labels,
  datasets: [
    {
      label: "Total Customers",
      data: customerData,
      backgroundColor: DARK_BLUE, // Dark blue color
      borderRadius: 10, // Ensure square bar tops
      barPercentage: 0.2,
    },
  ],
};

// 3. Chart Options Object (to replicate the styling)
const options = {
  responsive: true,
  maintainAspectRatio: false, // Allows you to control the size with CSS/Tailwind

  // Hiding the built-in title/legend to use the Card title instead
  plugins: {
    legend: {
      display: false,
    },
    // We will use the Antd Card title instead of the ChartJS title for a clean integration
    title: {
      display: false,
    },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },

  scales: {
    // Y-Axis Configuration (Value Axis)
    y: {
      min: 0,
      max: 1200,
      grid: {
        drawBorder: false, // Hide the vertical axis line on the left
        color: "rgba(0, 0, 0, 0.1)", // Very light gray for grid lines
        borderDash: [5, 5], // Dashed grid lines
        drawTicks: false, // Hide the small marks next to the labels
      },
      ticks: {
        color: "#444",
        stepSize: 400, // Show ticks at 400, 800, 1200
        // Custom formatting for the numbers (400, 800, 1.200)
        callback: function (value) {
          if (value === 0) return "";
          if (value >= 1000) {
            // This logic is simplified based on the image's appearance (1.200)
            return (value / 1000).toFixed(0) + ".200";
          }
          return value;
        },
      },
    },

    // X-Axis Configuration (Category Axis)
    x: {
      grid: {
        display: false, // Hide all vertical grid lines
        drawBorder: true, // Keep the horizontal axis line at the bottom
      },
      ticks: {
        color: "black", // Color of the month labels
      },
    },
  },
};

const Dashboard = () => {
  const data = [
    { name: "Hibiscus Estate", value: 25000 },
    { name: "Meadow Estate", value: 23000 },
    { name: "Hill Top", value: 22000 },
    { name: "Forest", value: 21500 },
    { name: "Lake View", value: 20000 },
  ];

  const maxValue = Math.max(...data.map((d) => d.value));

  const salesReps = [
    { name: "Mikky Olashola", score: "2321", img: "/images/user-1.png" },
    { name: "Kenny Shin", score: "2323", img: "/images/user-2.png" },
    { name: "Jonny Sammy", score: "1212", img: "/images/user-3.png" },
    { name: "Ikechukwu Kelvin", score: "12312", img: "/images/user-4.png" },
    { name: "Ogechi Mary", score: "1231", img: "/images/user-5.png" },
    { name: "Kingsway James", score: "12312", img: "/images/user-6.png" },
    { name: "John Babatunde", score: "12423", img: "/images/user-7.png" },
  ];

  const estates = [
    {
      key: "1",
      name: "Medal Estate",
      location: "Karasana",
      plots: 35,
      owned: 20,
      left: 15,
      image: "/images/house-1.png",
    },
    {
      key: "2",
      name: "Hill Top",
      location: "Lokogoma",
      plots: 19,
      owned: 10,
      left: 9,
      image: "/images/house-2.png",
    },
    {
      key: "3",
      name: "Garden View",
      location: "Mabushi",
      plots: 67,
      owned: 20,
      left: 47,
      image: "/images/house-3.png",
    },
    {
      key: "4",
      name: "Kings View",
      location: "Lugbe",
      plots: 94,
      owned: 40,
      left: 54,
      image: "/images/house-4.png",
    },
    {
      key: "5",
      name: "Prime Class",
      location: "Karu",
      plots: 23,
      owned: 12,
      left: 11,
      image: "/images/house-5.png",
    },
    {
      key: "6",
      name: "Hutu - Classic",
      location: "Maitama",
      plots: 56,
      owned: 50,
      left: 6,
      image: "/images/house-6.png",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar
            shape="square"
            size={40}
            src={record.image}
            className="rounded-md"
          />
          <span className="font-medium text-gray-800">{record.name}</span>
        </div>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      className: "text-gray-600",
    },
    {
      title: "Plots",
      dataIndex: "plots",
      key: "plots",
    },
    {
      title: "Owned / Left",
      key: "ownedLeft",
      render: (_, record) => (
        <span>
          {record.owned} / {record.left}
        </span>
      ),
    },
  ];

  return (
    <div className="relative top-14 pb-10">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-white rounded-md">
          <div className="p-7 border-r">
            <div className="flex items-center gap-4">
              <img src={users} alt="" className="w-12" />
              <div>
                <h1 className="text-2xl font-bold text-[#000068]">1000</h1>
                <p className="text-gray-500 text-sm">Total Customers</p>
              </div>
            </div>
          </div>

          <div className="p-7 border-r">
            <div className="flex items-center gap-4">
              <img src={estate} alt="" className="w-12" />
              <div>
                <h1 className="text-2xl font-bold text-[#000068]">13</h1>
                <p className="text-gray-500 text-sm">Total Estates</p>
              </div>
            </div>
          </div>

          <div className="p-7 border-r">
            <div className="flex items-center gap-4">
              <img src={revenue} alt="" className="w-12" />
              <div>
                <h1 className="text-2xl font-bold text-[#000068]">
                  ₦1,000,000
                </h1>
                <p className="text-gray-500 text-sm">Total Sales</p>
              </div>
            </div>
          </div>

          <div className="p-7">
            <div className="flex items-center gap-4">
              <img src={revenue} alt="" className="w-12" />
              <div>
                <h1 className="text-2xl font-bold text-[#000068]">
                  ₦1,000,000
                </h1>
                <p className="text-gray-500 text-sm">Total Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* section 2 */}
        <div className="grid grid-cols-[2fr_1fr] gap-6">
          <div className="p-6 bg-white rounded-md">
            <h2 className="font-semibold mb-4 text-lg">Total Customers</h2>

            {/* Tailwind utility to control the chart height */}
            <div className="h-80">
              <Bar options={options} data={chartData} />
            </div>
          </div>

          <div className="p-6 bg-white rounded-md">
            <h2 className="font-semibold mb-4 text-lg">Top Estates Sales</h2>

            <div className="space-y-4">
              {data.map((item, i) => {
                const percent = Math.round((item.value / maxValue) * 100);

                return (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.name}</span>
                      <span className="font-medium">
                        ₦{item.value.toLocaleString()}
                      </span>
                    </div>

                    <Progress
                      percent={percent}
                      showInfo={false}
                      strokeWidth={8}
                      strokeColor="#000068"
                      strokeLinecap="round"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* section 4 */}
        <div className="grid grid-cols-[2fr_1fr] gap-6 mt-8">
          <div className="p-6 bg-white rounded-md">
            <h1 className="font-bold text-lg mb-4">Your Estates</h1>
            <Table
              columns={columns}
              dataSource={estates}
              pagination={false}
              className="estate-table"
              size="small"
            />
          </div>

          <div className="p-6 bg-white rounded-md">
            <h1 className="font-bold text-lg mb-4">Top Sales Rep</h1>

            <div className="space-y-4">
              {salesReps.map((rep, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar size={40} src={rep.img} />
                    <span className="text-sm font-medium text-gray-800 underline cursor-pointer">
                      {rep.name}
                    </span>
                  </div>

                  <span className="text-sm text-gray-500">{rep.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
