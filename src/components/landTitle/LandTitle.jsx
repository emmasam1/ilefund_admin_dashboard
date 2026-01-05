import { useState, useContext, useEffect } from "react";
import {
  Button,
  message,
  Card,
  Tag,
  Skeleton,
  Divider,
  Form,
  Modal,
  Input,
} from "antd";
import plus_gray from "/images/icons/plus_gray.png";
import { Context } from "../../context/Context";
import axios from "axios";

const { TextArea } = Input;

const SKELETON_COUNT = 6;

const LandTitle = () => {
  const { baseUrl, accessToken } = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [docs, setDocs] = useState([]);

  // ✅ MODAL STATE (WAS MISSING)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const getDocs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/config/land-titles`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      // Normalize response (single or array)
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
        ? res.data.data
        : [res.data];

      setDocs(data);
    } catch (error) {
      message.error("Failed to fetch Land Titles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!baseUrl || !accessToken) return;
    getDocs();
  }, [baseUrl, accessToken]);

  // ✅ MODAL HANDLERS
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSave = async (values) => {
    try {
      setSaveLoading(true);

      const res = await axios.post(`${baseUrl}/config/land-titles`, values, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      message.success(
        res?.data?.message || "Land title document type added successfully"
      );

      handleCancel();
      getDocs();
    } catch (error) {
      console.error(error);
      message.error(
        error.response?.data?.message || "Failed to add document type"
      );
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Land Title Document Type</h1>
        <Button
          onClick={showModal}
          className="bg-[#000068] hover:!bg-[#000068] !text-white border-none flex gap-2"
        >
          <img src={plus_gray} className="w-5" />
          Add Prototype
        </Button>
      </div>

      <Divider className="my-4" />

      {/* Grid */}
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <Card key={index} className="shadow-md">
                  <Skeleton
                    active
                    title={{ width: "80%" }}
                    paragraph={{ rows: 3 }}
                  />
                  <div className="mt-4 flex justify-between items-center">
                    <Skeleton.Button active size="small" />
                    <Skeleton.Input active size="small" style={{ width: 80 }} />
                  </div>
                </Card>
              ))
            : docs.map((doc) => (
                <Card key={doc._id} hoverable className="shadow-md">
                  <h1 className="text-xs font-bold">{doc.name}</h1>
                  <p className="mt-1 text-xs text-gray-400">
                    {doc.description}
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <Tag color={doc.status === "pending" ? "orange" : "green"}>
                      {doc.status.toUpperCase()}
                    </Tag>
                    <span className="text-xs text-gray-400">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </Card>
              ))}
        </div>

        {!loading && docs.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No land titles found.
          </div>
        )}
      </div>

      {/* Add Land Title Modal */}
      <Modal
        title="Add Land Title Document Type"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={400}
        destroyOnClose
      >
        <Form layout="vertical" form={form} onFinish={handleSave}>
          <Form.Item
            label="Document Name"
            name="name"
            rules={[{ required: true, message: "Please enter document name" }]}
          >
            <Input placeholder="e.g 4 Bedroom Semi Detached Duplex" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea rows={2} className="!resize-none" />
          </Form.Item>

          <Button
            htmlType="submit"
            loading={saveLoading}
            block
            className="bg-[#000068] hover:!bg-[#000068] !border-none !text-white"
          >
            Save
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default LandTitle;
