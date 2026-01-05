import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Input,
  Button,
  Table,
  Avatar,
  Dropdown,
  Modal,
  Form,
  message,
  Skeleton,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import download_icon from "/images/icons/download.png";
import plus from "/images/icons/plus.png";
import more_horiz from "/images/icons/more_horiz.png";
import plus_gray from "/images/icons/plus_gray.png";
import delete_icon from "/images/icons/delete_icon.png";
import { Link, Outlet } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

const { TextArea } = Input;

const Estates = () => {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [protoypeModalOpen, setPrototypeModalOpen] = useState(false);
  const { baseUrl, accessToken } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [estateLoading, setEstateLoading] = useState(false);
  const [estates, setEstates] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // console.log(accessToken)

  // 🔹 ADDED STATE
  const [estateForm] = Form.useForm();
  const [prototypeForm] = Form.useForm();
  const [estateDraft, setEstateDraft] = useState(null);
  const [prototypes, setPrototypes] = useState([]);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  // 🔹 OPEN PROTOTYPE (SAVE ESTATE DRAFT)
  const handlePrototypeModalOpen = async () => {
    const values = await estateForm.validateFields();
    setEstateDraft(values);
    setIsModalOpen(false);
    setPrototypeModalOpen(true);
  };

  // 🔹 CANCEL PROTOTYPE (RETURN TO ESTATE)
  const handlePrototypeModalCancel = () => {
    setPrototypeModalOpen(false);
    setIsModalOpen(true);
    estateForm.setFieldsValue(estateDraft);
  };

  // 🔹 SAVE PROTOTYPE
  const handleSavePrototype = (values) => {
    setPrototypes((prev) => [...prev, values]);
    setPrototypeModalOpen(false);
    setIsModalOpen(true);
    estateForm.setFieldsValue(estateDraft);
    prototypeForm.resetFields();
  };

  const getEstates = async (page = 1, limit = 10, status = null) => {
    try {
      setEstateLoading(true);

      const res = await axios.get(`${baseUrl}/estates`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { page, limit, ...(status ? { status } : {}) },
      });

      // ✅ SET DATA
      setEstates(res.data?.data || []);

      setPagination({
        current: res.data.meta.page,
        pageSize: res.data.meta.limit,
        total: res.data.meta.total,
      });

      message.success(res.data.message || "Estate loaded successfully");
      console.log(res);
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to load estate");
    } finally {
      // ✅ STOP SKELETON LOADING
      setEstateLoading(false);
    }
  };

  useEffect(() => {
    if (!baseUrl || !accessToken) return;

    getEstates(pagination.current, pagination.pageSize, statusFilter);
  }, [
    baseUrl,
    accessToken,
    statusFilter,
    pagination.current,
    pagination.pageSize,
  ]);

  // 🔹 SAVE ESTATE
  const handleSaveEstate = async (values) => {
    const payload = {
      name: values.name,
      location: values.location, // ✅ already matches backend
      description: values.description,
      prototypes,
    };

    try {
      setLoading(true);

      const { data } = await axios.post(`${baseUrl}/estates`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(data);
      message.success(data?.message || "Estate added successfully!");
      setIsModalOpen(false);
      // setPrototypes([]);
      estateForm.resetFields();
    } catch (error) {
      message.error(error?.response?.data?.message || "Failed to add estate.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const STATUS_MAP = {
    "All Orders": null,
    Active: "active",
    Acquisition: "acquisition",
    "In-Processing": "in-processing",
    "Sold Out": "sold-out",
  };

  const dataSource = estateLoading
    ? Array.from({ length: 6 }).map((_, i) => ({
        key: i,
        skeleton: true,
      }))
    : estates.map((estate, index) => ({
        key: estate._id,
        sn: index + 1,
        estatename: estate.name,
        location: `${estate.location?.city || ""}, ${
          estate.location?.state || ""
        }`,
        prototypes: estate.prototypeId?.length || 0,
        status: estate.isActive ? "Active" : "Inactive",
        raw: estate,
      }));

  const deletEsthat = async (record) => {
    const id = record.key;
    try {
      const res = await axios.delete(`${baseUrl}/estates/${id}/payment-plans`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      message.success(res.data.message || "Estate deleted successfully");
      getEstates();
    } catch (error) {
      message.error(error.response?.data?.message || "Failed to delete estate");
    }
  };

  const getActionMenu = (record) => ({
    items: [
      {
        key: "1",
        label: <p>View Details</p>,
      },
      {
        key: "2",
        label: <p>View Subscribers</p>,
      },
      {
        key: "3",
        label: (
          <Link to="/estates/prototypes" state={{ estate: record.raw }}>
            Prototypes
          </Link>
        ),
      },
      {
        key: "4",
        label: (
          <p className="text-red-600" onClick={() => deletEsthat(record)}>
            Delete Estate
          </p>
        ),
      },
    ],
  });

  const columns = [
    {
      title: "SN",
      dataIndex: "sn",
      render: (_, r) => (r.skeleton ? <Skeleton.Input size="small" /> : r.sn),
    },
    {
      title: "Estate Name",
      render: (_, r) =>
        r.skeleton ? (
          <Skeleton avatar active paragraph={false} />
        ) : (
          <div className="flex items-center gap-3">
            <Avatar className="bg-blue-600">{r.estatename.charAt(0)}</Avatar>
            <p className="font-medium">{r.estatename}</p>
          </div>
        ),
    },
    {
      title: "Location",
      render: (_, r) =>
        r.skeleton ? <Skeleton.Input size="small" /> : r.location,
    },
    {
      title: "Prototypes",
      render: (_, r) =>
        r.skeleton ? <Skeleton.Input size="small" /> : r.prototypes,
    },
    {
      title: "Status",
      render: (_, r) =>
        r.skeleton ? (
          <Skeleton.Input size="small" />
        ) : (
          <span className="text-green-600 font-medium">{r.status}</span>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.skeleton ? (
          <Skeleton.Button size="small" />
        ) : (
          <Dropdown menu={getActionMenu(record)} trigger={["click"]}>
            <img src={more_horiz} alt="More" className="w-5 cursor-pointer" />
          </Dropdown>
        ),
    },
  ];

  // 🔹 DELETE PROTOTYPE
  const handleDeletePrototype = (index) => {
    setPrototypes((prev) => prev.filter((_, i) => i !== index));
  };

  const tabs = Object.keys(STATUS_MAP);

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
                onClick={() => {
                  setActiveTab(tab);
                  setStatusFilter(STATUS_MAP[tab]);
                  setPagination((prev) => ({ ...prev, current: 1 }));
                }}
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
              Add Estate
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
              // loading={estateLoading}
              size="small"
              className="custom-pagination"
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
                showSizeChanger: true,
                pageSizeOptions: ["10", "12", "25", "50"],
                showTotal: (total, range) =>
                  `Showing ${range[0]}–${range[1]} of ${total}`,
                onChange: (page, pageSize) => {
                  setPagination((prev) => ({
                    ...prev,
                    current: page,
                    pageSize,
                  }));

                  getEstates(page, pageSize, statusFilter);
                },
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Add Estate Modal */}
      <Modal
        title="Add Estate"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={400}
      >
        <Form layout="vertical" form={estateForm} onFinish={handleSaveEstate}>
          <Form.Item
            label="Estate Name"
            name="name"
            rules={[{ required: true, message: "Please enter estate name" }]}
          >
            <Input placeholder="e.g Paradise City" />
          </Form.Item>

          <Form.Item
            label="Address"
            name={["location", "address"]}
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input placeholder="e.g 13, Karu road, Nyanya" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="City"
              name={["location", "city"]}
              rules={[{ required: true, message: "Please enter city" }]}
            >
              <Input placeholder="e.g Abuja" />
            </Form.Item>

            <Form.Item
              label="State"
              name={["location", "state"]}
              rules={[{ required: true, message: "Please enter state" }]}
            >
              <Input placeholder="e.g FCT" />
            </Form.Item>
          </div>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea rows={3} className="!resize-none" />
          </Form.Item>

          {/* 🔹 ADD PROTOTYPE BUTTON */}
          <Button
            type="button"
            onClick={handlePrototypeModalOpen}
            className="w-full mb-3 border-none hover:!text-black"
          >
            <img src={plus_gray} alt="" className="w-5" />
            Add Prototype
          </Button>

          {/* 🔹 SHOW ADDED PROTOTYPES */}
          {prototypes.map((p, i) => (
            <div key={i} className="p-2 mb-2 border rounded text-sm bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <strong>{p.title}</strong>
                  <div className="flex gap-3 mt-2">
                    <p className="text-gray-500 text-xs">
                      N{p.price?.toLocaleString()}
                    </p>
                    <p className="text-gray-500 text-xs">{p.squareMeter}SQM</p>
                  </div>
                </div>
                <img
                  src={delete_icon}
                  alt=""
                  onClick={() => handleDeletePrototype(i)}
                  className="w-6 cursor-pointer"
                />
              </div>
            </div>
          ))}

          <Button
            htmlType="submit"
            block
            loading={loading}
            className="bg-[#000068] hover:!bg-[#000068] !border-none !text-white"
          >
            Save Estate
          </Button>
        </Form>
      </Modal>

      {/* Prototype Modal */}
      <Modal
        title="Add Prototype"
        open={protoypeModalOpen}
        onCancel={handlePrototypeModalCancel}
        footer={null}
        width={400}
      >
        <Form
          layout="vertical"
          form={prototypeForm}
          onFinish={handleSavePrototype}
        >
          <Form.Item
            label="Prototype Name"
            className="mb-3"
            name="title"
            rules={[{ required: true, message: "Please enter prototype name" }]}
          >
            <Input placeholder="e.g 4 Bedroom Semi Detached Duplex" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Form.Item
                label="Quantity"
                name="quantity"
                className="mb-3"
                rules={[{ required: true, message: "Please enter quantity" }]}
              >
                <Input placeholder="e.g 30" />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Price"
                className="mb-3"
                name="price"
                rules={[{ required: true, message: "Please enter price" }]}
              >
                <Input placeholder="e.g 1,500,000" />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Initial Deposit"
                className="mb-3"
                name="initialDeposit"
                rules={[
                  { required: true, message: "Please enter initial deposit" },
                ]}
              >
                <Input placeholder="e.g N500,000.00" />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Duration (Months)"
                className="mb-3"
                name="duration"
                rules={[{ required: true, message: "Please enter duration" }]}
              >
                <Input placeholder="e.g 6" />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Square Meter (SQM)"
                name="squareMeter"
                rules={[
                  { required: true, message: "Please enter square meter" },
                ]}
              >
                <Input placeholder="e.g 500" />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Instalments"
                name="instalments"
                rules={[
                  { required: true, message: "Please enter instalments" },
                ]}
              >
                <Input placeholder="e.g 3" />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true }]}
          >
            <TextArea rows={2} className="!resize-none" />
          </Form.Item>

          <Button
            htmlType="submit"
            block
            className="bg-[#000068] hover:!bg-[#000068] !border-none !text-white"
          >
            Save
          </Button>
        </Form>
      </Modal>
      <Outlet />
    </div>
  );
};

export default Estates;
