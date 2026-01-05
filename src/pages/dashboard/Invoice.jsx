import React, { useState } from "react";
import { Input, Button, Table, Dropdown, Modal  } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import more_horiz from "/images/icons/more_horiz.png";
import download_icon from "/images/icons/download.png";

const Invoice = () => {
 const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedInvoice, setselectedInvoice] = useState(null);
     const showModal = (record) => {
    setselectedInvoice(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dataSource = [
    {
      ID: "INV491-38",
      customerName: "Harris Holdings LLC",
      property: 4,
      status: "Paid",
      dueDate: "15, Feb 2024",
      totalAmount: "₦520,111.00",
      totalQty: 112,
    },
    {
      ID: "INV829-65",
      customerName: "Lee Logistics Ltd.",
      property: 22,
      status: "Paid",
      dueDate: "07, Dec 2023",
      totalAmount: "₦46,789",
      totalQty: 1212,
    },
    {
      ID: "INV376-14",
      customerName: "Martinez Media Group Inc.",
      property: 8,
      status: "Cancelled",
      dueDate: "26, Nov 2022",
      totalAmount: "₦55,432",
      totalQty: 1241,
    },
    {
      ID: "INV853-90",
      customerName: "Thomas Tech Solutions LLC",
      property: 12,
      status: "Paid",
      dueDate: "19, Oct 2021",
      totalAmount: "₦45,678",
      totalQty: 122,
    },
    {
      ID: "INV672-84",
      customerName: "Anderson Analytics Ltd.",
      property: 18,
      status: "Cancelled",
      dueDate: "02, Sep 2020",
      totalAmount: "₦50,876",
      totalQty: 512,
    },
    {
      ID: "INV490-21",
      customerName: "Taylor & Co. Inc.",
      property: 30,
      status: "Paid",
      dueDate: "14, Aug 2023",
      totalAmount: "₦54,321",
      totalQty: 1232,
    },
    {
      ID: "INV238-57",
      customerName: "Wilson Works LLC",
      property: 23,
      status: "Overdue",
      dueDate: "29, Jul 2021",
      totalAmount: "₦47,654",
      totalQty: 1232,
    },
    {
      ID: "INV145-33",
      customerName: "Davis Dynamics Group Ltd.",
      property: 22,
      status: "Pending",
      dueDate: "11, Jun 2022",
      totalAmount: "₦51,890",
      totalQty: 12412,
    },
    {
      ID: "INV917-76",
      customerName: "Brownstone Technologies Corp.",
      property: 16,
      status: "Partially Paid",
      dueDate: "30, May 2023",
      totalAmount: "₦49,234",
      totalQty: 1231,
    },
    {
      ID: "INV304-12",
      customerName: "WhiteWave Enterprises Inc.",
      property: 15,
      status: "Paid",
      dueDate: "17, Apr 2020",
      totalAmount: "₦53,678",
      totalQty: 1214,
    },
    {
      ID: "INV562-89",
      customerName: "Johnson Innovations LLC",
      property: 32,
      status: "Cancelled",
      dueDate: "23, Jan 2022",
      totalAmount: "₦48,912",
      totalQty: 2112,
    },
    {
      ID: "INV783-45",
      customerName: "GreenTech Solutions Ltd.",
      property: 12,
      status: "Cancelled",
      dueDate: "05, Mar 2021",
      totalAmount: "₦52,347",
      totalQty: 1212,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "#33DF69";
      case "Cancelled":
        return "#FF6259";
      case "Overdue":
        return "#000068";
      case "Pending":
        return "#FFB400";
      case "Partially Paid":
        return "#7474E1";
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
      dataIndex: "ID",
      key: "ID",
      className: "text-gray-500 text-sm",
    },
    {
      title: "Customer Name",
      key: "customerName",
      dataIndex: "customerName",
    },
    {
      title: "Property",
      dataIndex: "property",
      key: "property",
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
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      className: "text-gray-500 text-sm",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      className: "text-gray-500 text-sm",
    },
    {
      title: "Total Qty",
      dataIndex: "totalQty",
      key: "totalQty",
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
        {/* Search & Actions */}
        <div className="flex justify-between items-center mb-6">
          <Input
            placeholder="Search by ID, name or email"
            prefix={<SearchOutlined className="text-gray-400" />}
            allowClear
            className="w-full md:w-72"
          />
          <div className="flex gap-3">
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

       {/* Invoice Details Modal */}
            <Modal
              title="Invoice Details"
              open={isModalOpen}
              // className="p-4"
              onCancel={handleCancel}
              footer={null}
              // width={430}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Customer Name:</p>
                  <p className="font-semibold text-[.8rem]">
                    {selectedInvoice?.customerName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">ID:</p>
                  <p className="font-semibold text-[.8rem]">{selectedInvoice?.ID}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email:</p>
                  <p className="font-semibold text-[.8rem]">
                    {selectedInvoice?.email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Phone:</p>
                  <p className="font-semibold text-[.8rem]">
                    {selectedInvoice?.phone}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Position:</p>
                  <p className="font-semibold text-[.8rem]">
                    {selectedInvoice?.position}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Date Created:</p>
                  <p className="font-semibold text-[.8rem]">
                    {selectedInvoice?.date}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Last Login:</p>
                  <p className="font-semibold text-[.8rem]">12, Feb 2023</p>
                </div>
              </div>
            </Modal>
    </div>
  );
};

export default Invoice;
