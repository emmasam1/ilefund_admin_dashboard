import { useState, useContext, useEffect } from "react";
import {
  Button,
  Divider,
  message,
  Skeleton,
  Card,
  Input,
  Modal,
  Form,
} from "antd";
import plus_gray from "/images/icons/plus_gray.png";
import { Context } from "../../context/Context";
import axios from "axios";

const { TextArea } = Input;

const SKELETON_COUNT = 6;

const Category = () => {
  const { baseUrl, accessToken } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSave = async (values) => {
    try {
      setSaveLoading(true);
      const res = await axios.post(`${baseUrl}/config/property-types`, values, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      message.success(res.data.message || "Category added successfully");
      setIsModalOpen(false);
      getCategory();
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to add document type"
      );
    } finally {
      setSaveLoading(false);
    }
  };

  const getCategory = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${baseUrl}/config/property-types`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      message.success(res.data.message || "Category loaded successfully");
      setCategoryData(res?.data?.data || []);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to fetch categories"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!baseUrl || !accessToken) return;
    getCategory();
  }, [baseUrl, accessToken]);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Category</h1>
        <Button
          onClick={showModal}
          className="bg-[#000068] hover:!bg-[#000068] hover:!text-white text-white border-none flex gap-2"
        >
          <img src={plus_gray} className="w-5" />
          Add Category
        </Button>
      </div>

      <Divider className="my-4" />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <Card
                key={index}
                size="small"
                className="shadow-sm"
                bodyStyle={{ padding: 12 }}
              >
                <Skeleton
                  active
                  title={{ width: "60%" }}
                  paragraph={{ rows: 2 }}
                />
              </Card>
            ))
          : categoryData.map((item) => (
              <Card
                key={item._id}
                hoverable
                size="small"
                className="shadow-sm transition-all hover:shadow-md"
                bodyStyle={{ padding: 12 }}
              >
                <h2 className="text-sm font-semibold">{item.name}</h2>

                <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                  {item.description || "No description"}
                </p>
              </Card>
            ))}
      </div>

      {/* Empty State */}
      {!loading && categoryData.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No categories found.
        </div>
      )}

      {/* Add Category Modal */}
      <Modal
        title="Add Category"
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
            rules={[{ required: true, message: "Please enter cate name" }]}
          >
            <Input placeholder="e.g Land" />
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

export default Category;
