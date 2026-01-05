import { useState, useContext, useEffect } from "react";
import {
  Button,
  Divider,
  Skeleton,
  message,
  Card,
  Tag,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import plus_gray from "/images/icons/plus_gray.png";
import { Context } from "../../context/Context";
import axios from "axios";

const { Option } = Select;

const SKELETON_COUNT = 6;

const LAND_SIZE_UNITS = [
  { value: "sqm", label: "Square Meter (sqm)" },
  { value: "sqft", label: "Square Feet (sqft)" },
  { value: "plot", label: "Plot" },
  { value: "acre", label: "Acre" },
  { value: "hectare", label: "Hectare" },
  { value: "custom", label: "Custom Unit" },
];

const LandSize = () => {
  const { baseUrl, accessToken } = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const getLandSize = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/land-size`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
        ? res.data.data
        : [res.data];

      setSizes(data);
    } catch (error) {
      message.error("Failed to fetch Land Sizes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!baseUrl || !accessToken) return;
    getLandSize();
  }, [baseUrl, accessToken]);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSave = async (values) => {
    try {
      setSaveLoading(true);

      // store the response in a variable
      const res = await axios.post(`${baseUrl}/land-size`, values, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      // success message
      message.success(res?.data?.message || "Land size added successfully");

      // close modal and reset form
      handleCancel();

      // refresh the grid
      getLandSize();
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || "Failed to add land size");
    } finally {
      setSaveLoading(false);
    }
  };

  const getUnitLabel = (unit) =>
    LAND_SIZE_UNITS.find((u) => u.value === unit)?.label || unit;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Land Size Units</h1>
        <Button
          onClick={showModal}
          className="bg-[#000068] text-white border-none flex gap-2"
        >
          <img src={plus_gray} className="w-5" />
          Add Land Size
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
                  title={{ width: "50%" }}
                  paragraph={{ rows: 1 }}
                />
              </Card>
            ))
          : sizes.map((size) => (
              <Card
                key={size._id}
                hoverable
                size="small"
                className="shadow-sm transition-all hover:shadow-md"
                bodyStyle={{ padding: 12 }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xs font-semibold uppercase">
                      {size.unit}
                    </h2>
                    <p className="text-[11px] text-gray-500">
                      {getUnitLabel(size.unit)}
                    </p>
                  </div>

                  <Tag
                    color={size.isActive ? "green" : "red"}
                    className="text-[10px] px-1 py-0"
                  >
                    {size.isActive ? "ACTIVE" : "INACTIVE"}
                  </Tag>
                </div>
              </Card>
            ))}
      </div>

      {!loading && sizes.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No land size units found.
        </div>
      )}

      {/* Add Land Size Modal */}
      <Modal
        title="Add Land Size"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={400}
        destroyOnClose
      >
        <Form layout="vertical" form={form} onFinish={handleSave}>
          <Form.Item
            label="Display Name"
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="e.g Square Meter" />
          </Form.Item>

          <Form.Item
            label="Unit"
            name="unit"
            rules={[{ required: true, message: "Please select a unit" }]}
          >
            <Select placeholder="Select unit">
              {LAND_SIZE_UNITS.map((unit) => (
                <Option key={unit.value} value={unit.value}>
                  {unit.label}
                </Option>
              ))}
            </Select>
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

export default LandSize;
