import { useState, useContext, useEffect } from "react";
import { Button, message, Divider, Skeleton } from "antd";
import plus_gray from "/images/icons/plus_gray.png";
import { Context } from "../../context/Context";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";

const Prototypes = () => {
  const { baseUrl, accessToken } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [prototypes, setPrototypes] = useState([]);
  const [selectedPlot, setSelectedPlot] = useState(null);

  const getPrototypes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/prototypes`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setPrototypes(res.data?.data || []);
      message.success(res.data.message)
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to fetch prototypes"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!baseUrl || !accessToken) return;
    getPrototypes();
  }, [baseUrl, accessToken]);

  const renderPlots = (prototype) => {
    const totalPlots = prototype.quantity || 0;

    return Array.from({ length: totalPlots }).map((_, index) => {
      const plotNumber = index + 1;
      const isTaken = prototype.buyers?.length > index;
      const isSelected = selectedPlot === `${prototype._id}-${plotNumber}`;

      return (
        <div
          key={plotNumber}
          onClick={() =>
            !isTaken &&
            setSelectedPlot(`${prototype._id}-${plotNumber}`)
          }
          className={`
            flex items-center justify-center gap-2
            rounded-lg px-4 py-2 text-sm cursor-pointer
            transition-all
            ${
              isTaken
                ? "bg-[#F1F3F9] text-gray-500 cursor-not-allowed"
                : isSelected
                ? "bg-[#B8BBC6] text-white"
                : "bg-[#F7F8FC] hover:bg-[#E9EBF3]"
            }
          `}
        >
          <span>Plot {String(plotNumber).padStart(2, "0")}</span>
          {isTaken && <UserOutlined className="text-blue-600" />}
        </div>
      );
    });
  };

  const SkeletonBlock = () => (
    <div className="space-y-4">
      <Skeleton.Input active size="small" style={{ width: 260 }} />
      <Divider />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton.Button
            key={i}
            active
            style={{ width: "100%", height: 40, borderRadius: 8 }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Prototypes</h1>
        <Button className="bg-[#000068] text-white hover:!bg-[#000068] border-none hover:!text-white">
          <img src={plus_gray} alt="" className="w-5 mr-2" />
          Add Prototype
        </Button>
      </div>

      {loading ? (
        <>
          <SkeletonBlock />
          <SkeletonBlock />
        </>
      ) : (
        prototypes.map((prototype) => (
          <div key={prototype._id} className="space-y-3">
            <h2 className="font-medium text-gray-700">
              {prototype.title}
            </h2>
            <Divider />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {renderPlots(prototype)}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Prototypes;
