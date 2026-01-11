import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Input,
  Table,
  Dropdown,
  Button,
  message,
  Skeleton,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

import more_horiz from "/images/icons/more_horiz.png";
import plus_gray from "/images/icons/plus_gray.png";
import { Context } from "../../context/Context";

const Payment = () => {
  const { baseUrl, accessToken } = useContext(Context);

  const tabs = ["All Payments", "Completed", "Pending"];

  const [activeTab, setActiveTab] = useState("All Payments");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // ================= PAGINATION STATE (SERVER SIDE) =================
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });

  // ================= FETCH PAYMENTS =================
  const getPayment = async (page = 1, limit = 20) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${baseUrl}/payments/company/payments`,
        {
          params: { page, limit },
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      setPayments(res.data.data || []);
      console.log(res)
      setPagination({
        current: res.data.meta.page,
        pageSize: res.data.meta.limit,
        total: res.data.meta.total,
      });
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to load payments"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!baseUrl || !accessToken) return;
    getPayment(pagination.current, pagination.pageSize);
  }, [baseUrl, accessToken]);

  // ================= FILTERS =================
  const filteredPayments = payments
    .filter((item) => {
      if (activeTab === "Completed") return item.payment?.commitmentPaid;
      if (activeTab === "Pending") return !item.payment?.commitmentPaid;
      return true;
    })
    .filter((item) =>
      item.estate?.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  // ================= TABLE COLUMNS =================
  const columns = [
    {
      title: "Name",
      dataIndex: "estate",
      key: "name",
      render: (estate) => (
        <span className="font-medium text-gray-800">
          {estate?.name || "—"}
        </span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "payment",
      key: "amount",
      render: (payment) => (
        <span className="font-medium">
          ₦{payment?.totalAmount?.toLocaleString()}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (date) =>
        new Date(date).toLocaleDateString("en-GB"),
    },
    {
      title: "Property",
      dataIndex: "prototype",
      key: "property",
      render: (prototype) => {
        if (!Array.isArray(prototype) || prototype.title)
          return "—";

        return (
          <div>
            <p className="font-medium">
              {prototypeId.length} properties
            </p>
            <p className="text-xs text-gray-500 truncate max-w-[220px]">
              {prototypeId.map((p) => p.title).join(", ")}
            </p>
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "payment",
      key: "status",
      render: (payment) => (
        <span
          className={`font-medium ${
            payment?.commitmentPaid
              ? "text-green-500"
              : "text-orange-500"
          }`}
        >
          {payment?.commitmentPaid ? "Completed" : "Pending"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              { key: "1", label: "View" },
              { key: "2", label: "Edit" },
            ],
          }}
        >
          <img
            src={more_horiz}
            alt="actions"
            className="w-5 cursor-pointer"
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="relative top-14 pb-10">
      {/* ================= HEADER ================= */}
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

        {/* Search & Button */}
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <Input
            placeholder="Search by estate name"
            prefix={<SearchOutlined className="text-gray-400" />}
            allowClear
            className="w-full md:w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button className="bg-[#000068] hover:!bg-[#000068] !border-none !text-white flex items-center gap-2">
            <img src={plus_gray} alt="" className="w-5" />
            Add Payment
          </Button>
        </div>
      </div>

      {/* ================= TABLE / SKELETON ================= */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-6 bg-white rounded-lg p-4"
        >
          {loading ? (
            <Skeleton active paragraph={{ rows: 8 }} />
          ) : (
            <Table
              columns={columns}
              dataSource={filteredPayments}
              rowKey="_id"
              size="small"
              className="custom-pagination"
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "25", "50"],
                showTotal: (total, range) =>
                  `Showing ${range[0]}–${range[1]} of ${total}`,
              }}
              onChange={(pag) => {
                getPayment(pag.current, pag.pageSize);
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Payment;
