import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input, Table, Dropdown, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import more_horiz from "/images/icons/more_horiz.png";

const Subscribers = () => {
  const [activeTab, setActiveTab] = useState("All Subscribers");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const tabs = ["All Subscribers", "Completed", "Pending"];

  const handleSubscriberDetails = (record) => {
    setSelectedSubscriber(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const getActionMenu = (record) => ({
    items: [
      {
        key: "1",
        label: <p onClick={() => handleSubscriberDetails(record)}>View Subscriber</p>,
      },
      { key: "2", label: <p className="text-red-600">Delete Subscriber</p> },
    ],
  });

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Prototype", dataIndex: "prototype", key: "prototype" },
    {
      title: "Amount Paid",
      dataIndex: "amountPaid",
      key: "amountPaid",
      render: (amountPaid) => (
        <span>₦{Number(amountPaid)?.toLocaleString()}</span>
      ),
    },
    {
      title: "Amount Remaining",
      dataIndex: "amountRemaining",
      key: "amountRemaining",
      render: (amountRemaining) => (
        <span>₦{Number(amountRemaining)?.toLocaleString()}</span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return status === "Completed" ? (
          <span className="text-[#00D743] font-medium">{status}</span>
        ) : (
          <span className="text-[#F43B1B] font-medium">{status}</span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown menu={getActionMenu(record)} trigger={["click"]}>
          <img src={more_horiz} alt="More" className="w-5 cursor-pointer" />
        </Dropdown>
      ),
    },
  ];

  const dataSource = [
    {
      key: "1",
      name: "Osaga Paul",
      prototype: 4,
      amountPaid: "2000000",
      amountRemaining: "1000000",
      status: "Completed",
    },
    {
      key: "2",
      name: "Ade Kevin",
      prototype: 3,
      amountPaid: "10000000",
      amountRemaining: "15000000",
      status: "Pending",
    },
    {
      key: "3",
      name: "John Doe",
      prototype: 2,
      amountPaid: "15000000",
      amountRemaining: "5000000",
      status: "Pending",
    },
  ];

  return (
    <div className="relative top-14 pb-10">
      <div className="mt-5">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-6 mb-6 mt-5 relative">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative text-sm font-medium pb-2 transition-colors duration-300 ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {tab}

                {/* Animated underline */}
                {isActive && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute left-0 right-0 -bottom-[2px] h-[2px] bg-blue-600 rounded"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center">
          <Input
            placeholder="Search by ID, name or email"
            prefix={<SearchOutlined className="text-gray-400" />}
            allowClear
            className="w-full md:w-72"
          />
        </div>

        {/* Animated tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-4"
          >
            <Table
              columns={columns}
              dataSource={dataSource}
              size="small"
              className="custom-pagination"
              pagination={{
                pageSize: 12,
                showSizeChanger: true, // ✅ SHOW selector
                pageSizeOptions: ["10", "12", "25", "50"],
                showTotal: (total, range) =>
                  `Showing ${range[0]}–${range[1]} of ${total}`,
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Subscribers;
