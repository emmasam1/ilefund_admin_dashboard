import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Input,
  Button,
  Table,
  Avatar,
  Dropdown,
  Modal,
  Form,
  Select,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import download_icon from "/images/icons/download.png";
import plus from "/images/icons/plus.png";
import more_horiz from "/images/icons/more_horiz.png";

const Employees = () => {
  const [activeTab, setActiveTab] = useState("All Employees");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignTaskModalOpen, setAssignTaskModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEmpDatailsModalOpen, setIsEmpDetailsModalOpen] = useState(false);

  const handleAssignTaskCancel = () => {
    setAssignTaskModalOpen(false);
  };

  const handleAssignTask = (record) => {
    console.log(record); // Logs the clicked employee
    setSelectedEmployee(record); // Save record to state
    setAssignTaskModalOpen(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEmpDetails = (record) => {
    setSelectedEmployee(record);
    setIsEmpDetailsModalOpen(true);
  };

  const handleEmpDetailsCancel = () => {
    setIsEmpDetailsModalOpen(false);
  };

  const tabs = [
    "All Employees",
    "Manager",
    "Sales Rep",
    "Site Manger",
    "Front Desk",
    "Admin",
  ];

  const dataSource = [
    {
      key: "1",
      id: "SM0221-10",
      name: "Liam Everhart",
      email: "liam.everhart@gmail.com",
      position: "Manager",
      date: "12, Feb 2023",
      phone: "(847) 785-2310",
    },
    {
      key: "2",
      id: "SM0221-10",
      name: "Ava Winslow",
      email: "ava.winslow@acme.net",
      position: "Sales Rep",
      date: "12, Feb 2023",
      phone: "(847) 785-2310",
    },
    {
      key: "3",
      id: "SM0221-10",
      name: "Sophia Marlowe",
      email: "max@citylights.biz",
      position: "Sales Rep",
      date: "12, Feb 2023",
      phone: "(847) 785-2310",
    },
    {
      key: "4",
      id: "SM0221-10",
      name: "Elijah Kensington",
      email: "wafriverbend.com",
      position: "Admin",
      date: "12, Feb 2023",
      phone: "(847) 785-2310",
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      className: "text-gray-500 text-sm",
    },
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar className="bg-blue-600">{record.name.charAt(0)}</Avatar>
          <div>
            <p className="font-medium text-gray-900 leading-tight">
              {record.name}
            </p>
            <p className="text-xs text-gray-400">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      render: (text) => <span className="text-sm text-gray-600">{text}</span>,
    },
    {
      title: "Date Added",
      dataIndex: "date",
      key: "date",
      className: "text-gray-500 text-sm",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      className: "text-gray-500 text-sm",
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

  const getActionMenu = (record) => ({
    items: [
      {
        key: "1",
        label: <p onClick={() => handleEmpDetails(record)}>View Details</p>,
      },
      {
        key: "2",
        label: <p>Assign Task</p>,
      },
      { key: "3", label: <p onClick={() => handleAssignTask(record)}>Assign Sales Rep</p> },
      { key: "4", label: <p className="text-red-600">Delete</p> },
    ],
  });

  onChange: (page, pageSize) => {
    fetchEmployees({ page, pageSize });
  };

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
          <div className="flex gap-3">
            <Button
              className="hover:!text-black hover:!border-gray-200"
              onClick={showModal}
            >
              <img src={plus} alt="" className="w-5" />
              Add Employee
            </Button>
            <Button className="bg-[#000068] hover:!bg-[#000068] !border-none !text-white">
              <img src={download_icon} alt="" className="w-3" />
              Download CSV
            </Button>
          </div>
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

      {/* Add Employee Modal */}
      <Modal
        title="Add A New Employee"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={400}
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            console.log(values);
            handleCancel();
          }}
        >
          {/* Title of Task */}
          <Form.Item
            label="Full Name"
            className="mb-3"
            name="title"
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email Address"
            className="mb-3"
            name="email"
            rules={[{ required: true, message: "Please enter email address" }]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          {/* Select Role */}
          <Form.Item
            label="Select Role"
            name="employee"
            className="mb-3"
            rules={[{ required: true, message: "Please select role" }]}
          >
            <Select
              placeholder="Select employee"
              options={[
                { value: "liam", label: "Front Desk" },
                { value: "sammy", label: "Sales Representative" },
                { value: "medplus", label: "Site Manager" },
                { value: "medplus", label: "Manager" },
              ]}
            />
          </Form.Item>

          {/* Employee’s Phone Number  */}
          <Form.Item
            label="Employee’s Phone Number "
            className="mb-3"
            name="description"
            rules={[
              {
                required: true,
                message: "Please enter employee's phone number",
              },
            ]}
          >
            <Input placeholder="Enter employee's phone number" />
          </Form.Item>

          {/* Employee’s Address  */}
          <Form.Item
            label="Employee’s Address "
            className="mb-3"
            name="address"
            rules={[
              {
                required: true,
                message: "Please enter employee's address",
              },
            ]}
          >
            <Input placeholder="Enter employee's address" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="">
            <Button
              type="primary"
              block
              htmlType="submit"
              className="bg-[#000068] hover:!bg-[#000068] !border-none !text-white "
            >
              Create Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Assign Task Modal */}
      <Modal
        title={
          <>
            <h2 className="text-gray-500">Assign Sales Rep to</h2>
            <h1 className="text-2xl">{selectedEmployee?.name}</h1>
          </>
        }
        open={assignTaskModalOpen}
        onCancel={handleAssignTaskCancel}
        footer={null}
        width={400}
      >
        {/* Form remains the same */}
        <Form layout="vertical">
          {/* Title of Task */}
          <Form.Item
            label="Rep’s Full Name"
            className="mb-3"
            name="title"
            rules={[
              { required: true, message: "Please enter rep’s Full Name" },
            ]}
          >
            <Input placeholder="Enter Sales’s Rep name here" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="">
            <Button
              type="primary"
              block
              htmlType="submit"
              className="bg-[#000068] hover:!bg-[#000068] !border-none !text-white "
            >
              Assign Reps
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Employee Details Modal */}
      <Modal
        title="Employee Details"
        open={isEmpDatailsModalOpen}
        // className="p-4"
        onCancel={handleEmpDetailsCancel}
        footer={null}
        // width={430}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Name:</p>
            <p className="font-semibold text-[.8rem]">
              {selectedEmployee?.name}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">ID:</p>
            <p className="font-semibold text-[.8rem]">{selectedEmployee?.id}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Email:</p>
            <p className="font-semibold text-[.8rem]">
              {selectedEmployee?.email}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Phone:</p>
            <p className="font-semibold text-[.8rem]">
              {selectedEmployee?.phone}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Position:</p>
            <p className="font-semibold text-[.8rem]">
              {selectedEmployee?.position}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Date Created:</p>
            <p className="font-semibold text-[.8rem]">
              {selectedEmployee?.date}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Last Login:</p>
            <p className="font-semibold text-[.8rem]">12, Feb 2023</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-500 text-sm">Achievements:</p>
          <p className="font-semibold text-[.8rem] text-[#000068] underline cursor-pointer">View Employee’s Achievement</p>
        </div>
        <div className="mt-4">
          <p className="text-gray-500 text-sm">Features:</p>
          <p className="font-semibold text-[.8rem] text-[#000068] underline cursor-pointer">View All Features</p>
        </div>
      </Modal>
    </div>
  );
};

export default Employees;
