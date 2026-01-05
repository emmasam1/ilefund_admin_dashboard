import React, { useState } from "react";
import material from "/images/icons/material.png";
import { Modal, Button, Form, Select, Input, DatePicker } from "antd";

const { TextArea } = Input;

const tabs = [
  "All",
  "To-Do",
  "Assigned",
  "Confirmed",
  "Completed",
  "Unconfirmed",
  "Overdue",
];

const stats = [
  { label: "To-Do", value: 23 },
  { label: "Assigned", value: 123 },
  { label: "Received", value: 241 },
  { label: "Completed", value: 412 },
  { label: "Unconfirmed", value: 212 },
  { label: "Overdue", value: 12 },
];

const tasks = [
  {
    name: "Liam Carter",
    title: "Follow up on this client: Tamsy Tech",
    status: "Assigned",
    date: "Jan 23 - Jan 24",
  },
  {
    name: "Medplus",
    title: "Confirm Payment",
    status: "Unconfirmed",
    date: "Jan 23",
  },
  {
    name: "Liam Carter",
    title: "Follow up on this client: Tamsy Tech",
    status: "Completed",
    date: "Jan 23 - Jan 24",
  },
  {
    name: "Liam Carter",
    title: "Follow up on this client: Tamsy Tech",
    status: "Due",
    date: "Jan 23 - Jan 24",
  },
  {
    name: "Medplus",
    title: "Confirm Payment",
    status: "Received",
    date: "Jan 23",
  },
  {
    name: "Medplus",
    title: "Overdue Invoice",
    status: "Overdue",
    date: "Jan 23",
  },
];

const statusColor = {
  Assigned: "bg-blue-100 text-blue-600",
  Completed: "bg-green-100 text-green-600",
  Unconfirmed: "bg-red-100 text-red-600",
  Received: "bg-gray-100 text-gray-600",
  Due: "bg-orange-100 text-orange-600",
  Overdue: "bg-yellow-100 text-yellow-600",
};

const TaskManager = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative top-14 pb-10">
      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-6 mb-6 mt-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-medium pb-2 ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
        <Button
          className="ml-auto bg-[#000068] hover:!bg-[#000068] !border-none !text-white px-4 py-2 rounded-md text-sm"
          onClick={showModal}
        >
          Assign Task
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-3"
          >
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
              <img src={material} alt="" className="w-5" />
            </div>
            <div>
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-sm">{task.name}</h3>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  statusColor[task.status]
                }`}
              >
                {task.status}
              </span>
            </div>

            <p className="text-sm text-gray-600">{task.title}</p>

            <p className="text-xs text-gray-400">{task.date}</p>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      <Modal
        title="Create a Task"
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
          {/* 1. Select Employee */}
          <Form.Item
            label="Select Employee"
            name="employee"
            className="mb-3"
            rules={[{ required: true, message: "Please select an employee" }]}
          >
            <Select
              placeholder="Select employee"
              options={[
                { value: "liam", label: "Liam Carter" },
                { value: "sammy", label: "Sammy John" },
                { value: "medplus", label: "Medplus" },
              ]}
            />
          </Form.Item>

          {/* 2. Title of Task */}
          <Form.Item
            label="Title of Task"
             className="mb-3"
            name="title"
            rules={[{ required: true, message: "Please enter task title" }]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>

          {/* 3. Description */}
          <Form.Item
            label="Description"
             className="mb-3"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea rows={3} style={{ resize: "none" }} placeholder="Enter task description" />
          </Form.Item>

          {/* 4. Due Date */}
          <Form.Item
            label="Select a Due Date"
            name="dueDate"
            rules={[{ required: true, message: "Please select due date" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="">
           
            <Button type="primary" block htmlType="submit" className="bg-[#000068] hover:!bg-[#000068] !border-none !text-white ">
              Create Task
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskManager;
