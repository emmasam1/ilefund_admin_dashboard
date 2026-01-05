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

const Features = () => {
  const { baseUrl, accessToken } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);

  const getFeatures = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/config/features`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      message.success(res.data.message || "Features loaded successfully");
      console.log(res)
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to add document type"
      );
    } finally {
      setSaveLoading(false);
    }
  };
  
  useEffect(() => {
    if (!baseUrl || !accessToken) return;
    getFeatures();
  }, [baseUrl, accessToken]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Features</h1>
        <Button
          //   onClick={showModal}
          className="bg-[#000068] hover:!bg-[#000068] hover:!text-white text-white border-none flex gap-2"
        >
          <img src={plus_gray} className="w-5" />
          Add Features
        </Button>
      </div>

      <Divider className="my-4" />
    </div>
  );
};

export default Features;
