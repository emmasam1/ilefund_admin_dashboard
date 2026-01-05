import React, { useState } from "react";
import { Input, Button, Table, Dropdown, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import more_horiz from "/images/icons/more_horiz.png";
import plus from "/images/icons/plus.png";
import download_icon from "/images/icons/download.png";

const Leads = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const showModal = (record) => {
    setSelectedEmployee(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dataSource = [
    {
      key: "1",
      id: "SMO221-10",
      name: "Tammy Tech",
      email: "vaze@vid.io",
      source: "Online",
      status: "New",
      dateAdded: "12, Feb 2023",
      phone: "(847) 785-2310",
    },
    {
      key: "2",
      id: "SMO221-10",
      name: "Abhoy Latif",
      email: "ripu@meije.org",
      source: "In-person",
      status: "Contacted",
      dateAdded: "12, Feb 2023",
      phone: "(847) 785-2310",
    },
    {
      key: "3",
      id: "SMO221-10",
      name: "Dushane Daniel",
      email: "ze@jlu.net",
      source: "Online",
      status: "ClosedLost",
      dateAdded: "12, Feb 2023",
      phone: "(847) 785-2310",
    },
    {
      key: "4",
      id: "SMO221-10",
      name: "Lungelo Ngcaba",
      email: "sana@ruwemoni.com",
      source: "In-person",
      status: "Follow up",
      dateAdded: "12, Feb 2023",
      phone: "(847) 785-2310",
    },
    {
      key: "5",
      id: "SMO221-10",
      name: "Nahla Colunga",
      email: "ucuma@wes.co.uk",
      source: "Online",
      status: "Qualified",
      dateAdded: "12, Feb 2023",
      phone: "(847) 785-2310",
    },
    {
      key: "6",
      id: "SMO221-10",
      name: "Nghiêm Thế Quyền",
      email: "han@viriojepss.com",
      source: "In-person",
      status: "Interested",
      dateAdded: "12, Feb 2023",
      phone: "(847) 785-2310",
    },
    {
      key: "7",
      id: "SMO221-10",
      name: "Nitithorn Prinya",
      email: "uhjac@tobpojito.net",
      source: "In-person",
      status: "Hold",
      dateAdded: "12, Feb 2023",
      phone: "(847) 785-2310",
    },
    {
      key: "8",
      id: "SMO221-10",
      name: "Saami Al Samad",
      email: "kavetv@jEUV.gov",
      source: "In-person",
      status: "In-Negotiations",
      dateAdded: "12, Feb 2023",
      phone: "(847) 785-2310",
    },
    {
      key: "9",
      id: "SMO221-10",
      name: "Sadou Mokaté",
      email: "ganituno@fci.org",
      source: "In-person",
      status: "LPO Generated",
      dateAdded: "12, Feb 2023",
      phone: "(847) 785-2310",
    },
    {
      key: "10",
      id: "SMO221-10",
      name: "Samuil Sadovsky",
      email: "ieha@sehsoif.co.uk",
      source: "Sales Rep",
      status: "ClosedWon",
      dateAdded: "12, Feb 2023",
      phone: "(847) 785-2310",
    },
    {
      key: "11",
      id: "SMO221-10",
      name: "Somun Ae-Ri",
      email: "uwajih@sijhugiao.io",
      source: "Manager",
      status: "Payment Confirmed",
      dateAdded: "12, Feb 2023",
      phone: "(847) 785-2310",
    },
    {
      key: "12",
      id: "SMO221-10",
      name: "Tsuishi ichiha",
      email: "apiaop@ocehitag.io",
      source: "Manager",
      status: "Order Fulfilled",
      dateAdded: "12, Feb 2023",
      phone: "(847) 785-2310",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "#000068";
      case "Contacted":
        return "#FFB400";
      case "Follow up":
        return "#12D1E2";
      case "Qualified":
        return "#6666D2";
      case "Interested":
        return "#768B00";
      case "Hold":
        return "#FF3B30";
      case "In-Negotiations":
        return "#A97B0E";
      case "LPO Generated":
        return "#1A1A1A";
      case "Payment Confirmed":
        return "#D300D7";
      case "Order Fulfilled":
        return "#FF7105";
      case "Won":
        return "#00D743";
      case "Closed Lost":
        return "#FF3B30";
      default:
        return "default";
    }
  };

  const getActionMenu = (record) => ({
    items: [
      {
        key: "1",
        label: <p onClick={() => showModal(record)}>View Details</p>,
      },
    ],
  });

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
        <div>
          <p className="font-medium text-gray-900">{record.name}</p>
          <p className="text-xs text-gray-500">{record.email}</p>
        </div>
      ),
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      className: "text-gray-500 text-sm",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        // ✅ Closed Won (two colors)
        if (status === "ClosedWon") {
          return (
            <p
              style={{
                padding: "4px 12px",
                borderRadius: "9999px",
                width: "fit-content",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              <span style={{ color: "#000000" }}>Closed</span>{" "}
              <span style={{ color: "#00D743" }}>Won</span>
            </p>
          );
        }

        // ✅ Closed Lost (optional but consistent)
        if (status === "ClosedLost") {
          return (
            <p
              style={{
                padding: "4px 12px",
                borderRadius: "9999px",
                width: "fit-content",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              <span style={{ color: "#000000" }}>Closed</span>{" "}
              <span style={{ color: "#FF3B30" }}>Lost</span>
            </p>
          );
        }

        // ✅ Default behavior (unchanged)
        return (
          <p
            style={{
              color: getStatusColor(status),
              padding: "4px 12px",
              borderRadius: "9999px",
              width: "fit-content",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {status}
          </p>
        );
      },
    },

    {
      title: "Date Added",
      dataIndex: "dateAdded",
      key: "dateAdded",
      className: "text-gray-500 text-sm",
    },
    {
      title: "Phone",
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

  return (
    <div className="relative top-14 pb-10">
      <div className="mt-5">
        {/* Tabs */}

        {/* Search & Actions */}
        <div className="flex justify-between items-center mb-6">
          <Input
            placeholder="Search by ID, name or email"
            prefix={<SearchOutlined className="text-gray-400" />}
            allowClear
            className="w-full md:w-72"
          />
          <div className="flex gap-3">
            <Button className="hover:!text-black hover:!border-gray-200">
              <img src={plus} alt="" className="w-5" />
              Add Lead
            </Button>
            <Button className="bg-[#000068] hover:!bg-[#000068] !border-none !text-white">
              <img src={download_icon} alt="" className="w-3" />
              Download CSV
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={dataSource}
          size="small"
          className="custom-pagination"
          pagination={{
            pageSize: 12,
            showSizeChanger: true,
            pageSizeOptions: ["10", "12", "25", "50"],
            showTotal: (total, range) =>
              `Showing ${range[0]}–${range[1]} of ${total}`,
          }}
          rowClassName="hover:!bg-gray-50 transition-colors"
        />
      </div>

       {/* Leads Details Modal */}
            <Modal
              title="Lead Details"
              open={isModalOpen}
              // className="p-4"
              onCancel={handleCancel}
              footer={null}
              // width={430}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Company Name:</p>
                  <p className="font-semibold text-[.8rem]">
                    {selectedEmployee?.name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">ID:</p>
                  <p className="font-semibold text-[.8rem]">{selectedEmployee?.id}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Company Email:</p>
                  <p className="font-semibold text-[.8rem]">
                    {selectedEmployee?.email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Company State:</p>
                  <p className="font-semibold text-[.8rem]">
                    Lagos, State
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Sales Rep:</p>
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
                  <p className="text-gray-500 text-sm">Potential Deal size (N):</p>
                  <p className="font-semibold text-[.8rem]">
                    {selectedEmployee?.date}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Number Of Stores:</p>
                  <p className="font-semibold text-[.8rem]">
                    {selectedEmployee?.date}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Source:</p>
                  <p className="font-semibold text-[.8rem]">
                    {selectedEmployee?.date}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Company Type:</p>
                  <p className="font-semibold text-[.8rem]">
                    {selectedEmployee?.date}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Phone No:</p>
                  <p className="font-semibold text-[.8rem]">{selectedEmployee?.phone}</p>
                </div>
              </div>
      
            </Modal>
    </div>
  );
};

export default Leads;
