"use client";
import LineChart from "@/chart/LineChart";
import { FaBloggerB, FaUsers } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";

const DashboardPage = () => {
  const date = new Date();
  const currentMonth = date.toLocaleString("en-US", { month: "short" });
  let month = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthValues = month.map((m) => (m === currentMonth ? 6 : 0));

  const plugins = [
    {
      beforeDatasetsDraw(chart: {
        ctx: { shadowColor: string; shadowBlur: number };
      }) {
        chart.ctx.shadowColor = "rgba(37, 99, 235, 0.14)";
        chart.ctx.shadowBlur = 8;
      },
      afterDatasetsDraw(chart: {
        ctx: { shadowColor: string; shadowBlur: number };
      }) {
        chart.ctx.shadowColor = "rgba(0, 0, 0, 0)";
        chart.ctx.shadowBlur = 0;
      },
    },
  ];
  const data = {
    labels: month,
    datasets: [
      {
        label: "Signed",
        data: [20, 15, 25, 10, 30, 20, 25], // An array of values corresponding to each label
        borderColor: "#22C55E",
        pointBorderColor: "#ffffff",
        pointBackgroundColor: "#22C55E",
        pointBorderWidth: 4,
        borderWidth: 2,
        fill: true,
        fillColor: "#fff",
        tension: 0.4,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        drawBorder: true,
        ticks: {
          color: "black",
        },
        grid: {
          display: true,
          drawBorder: false,
          color: "gray",
        },
        gridLines: {
          zeroLineColor: "transparent",
        },
      },
      y: {
        beginAtZero: true,
        border: { dash: [5, 5] },
        grid: {
          drawTicks: false,
          color: "black",
        },
        gridLines: {
          zeroLineColor: "transparent",
        },
        ticks: {
          color: "black",
          callback(value: any) {
            return `${value > 1000 ? value + "k" : value} `;
          },
        },
      },
    },

    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: false,
        text: "Visitor: 2k",
      },
      tooltip: {
        enabled: true,
      },
    },
    elements: {
      point: {
        radius: [8, 4],
        hoverRadius: 7,
      },
    },
  };
  return (
    <div className="bg-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-10 p-5">
        <div className="bg-white py-4 px-10 rounded-md">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <FaUsers className="text-4xl" />
            </div>
            <p className="text-2xl font-bold">Total Users</p>
          </div>
          <p className="text-2xl font-semibold pt-5">100+</p>
        </div>
        <div className="bg-white py-4 px-10 rounded-md">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <MdDesignServices className="text-4xl" />
            </div>
            <p className="text-2xl font-bold">Total Services</p>
          </div>
          <p className="text-2xl font-semibold pt-5">100+</p>
        </div>
        <div className="bg-white py-4 px-10 rounded-md">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <FaBloggerB className="text-4xl" />
            </div>
            <p className="text-2xl font-bold">Total Blogs</p>
          </div>
          <p className="text-2xl font-semibold pt-5">100+</p>
        </div>
      </div>
      <div className="lg:w-[1560px] px-10 py-10 mx-5 bg-white dark:bg-darkblack-600 flex flex-col justify-between rounded-lg lg:px-8 lg:py-7 p-4 mb-[48px]">
        <div className="flex justify-between items-center pb-2 mb-2">
          <div>
            <span className="text-sm font-medium text-bgray-600 dark:text-white">
              Total Traffic
            </span>
            <div className="flex items-center space-x-2">
              <h3 className="sm:text-2xl text-xl text-bgray-900 font-bold leading-[36px]">
                100+
              </h3>
              <span className="text-sm font-medium text-success-300">
                +20%↑
              </span>
            </div>
          </div>
        </div>
        <div className="w-[1000px] h-[280px]">
          <LineChart dataSet={data} option={options} plugins={plugins} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
