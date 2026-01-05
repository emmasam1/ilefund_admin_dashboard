import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, Card, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Context } from "../../context/Context";
import { FaArrowRightLong } from "react-icons/fa6";

const Login = () => {
  const { baseUrl, login } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email: values.email,
        password: values.password,
      });

      // console.log("LOGIN RESPONSE:", response.data);

      const { success, user, token, message: msg } = response.data;

      if (!success || !user || !token) {
        throw new Error(msg || "Invalid login response");
      }

      // ✅ SAVE TO SESSION STORAGE VIA CONTEXT
      login(user, token);

      message.success(msg || "Login successful!");
      navigate("/dashboard");

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      message.error(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT – FORM */}
      <div className="flex items-center justify-center px-4">
        <Card className="w-full max-w-sm shadow-md">
          <h1 className="text-center text-2xl font-semibold mb-1">
            Welcome Back
          </h1>
          <p className="text-center text-sm text-gray-500 mb-6">
            Sign in to continue
          </p>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter a valid email address" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="you@example.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item className="mt-6">
              <Button
                htmlType="submit"
                loading={loading}
                block
                size="small"
                className="bg-[#000068] hover:!bg-[#000068] hover:!text-white text-white border-none h-9"
              >
                {loading ? "Signing in..." : "Login"}
                <FaArrowRightLong />
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>

      {/* RIGHT – IMAGE */}
      <div className="hidden md:flex items-center justify-center bg-[url('/images/bg.jpg')] bg-cover bg-center"></div>
    </div>
  );
};

export default Login;
