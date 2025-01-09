import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Input, Select, App } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  HomeOutlined,
  CalendarOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import styles from "styles/auth.module.scss";
import { IUser } from "../../types/backend";
import { callRegister } from "../../config/api";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [emailError, setEmailError] = useState("");
  const { message } = App.useApp();

  const onFinish = async (values: IUser) => {
    const { name, email, password, age, gender, address } = values;
    setIsSubmit(true);
    setEmailError("");
    const res = await callRegister(
      name,
      email,
      password as string,
      +age,
      gender,
      address
    );
    setIsSubmit(false);
    if (res?.data?._id) {
      message.success("Registration successful!");
      navigate("/login");
    } else {
      if (res.statusCode === 400 && res.message?.includes("Email")) {
        setEmailError("Email already exists, please use another email.");
      } else {
        message.error("Registration error!");
      }
    }
  };

  return (
    <div className={styles["register-page"]}>
      <div className={styles["form-container"]}>
        <div className={styles["form-wrapper"]}>
          <h2 className={styles["page-title"]}>Register Account</h2>

          <Form<IUser>
            name="register"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            size="large"
            style={{ width: "100%" }}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Full name is required!" }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "#667eea" }} />}
                placeholder="Full Name"
                className={styles["form-input"]}
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Email is required!" },
                { type: "email", message: "Invalid email format!" },
              ]}
              validateStatus={emailError ? "error" : undefined}
              help={emailError || undefined}
            >
              <Input
                prefix={<MailOutlined style={{ color: "#667eea" }} />}
                placeholder="Email"
                className={styles["form-input"]}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Password is required!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#667eea" }} />}
                placeholder="Password"
                className={styles["form-input"]}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#667eea" }} />}
                placeholder="Confirm Password"
                className={styles["form-input"]}
              />
            </Form.Item>

            <div style={{ display: "flex", gap: "15px", marginBottom: "24px" }}>
              <Form.Item
                name="age"
                style={{ flex: 1, marginBottom: 0 }}
                rules={[{ required: true, message: "Age is required!" }]}
              >
                <Input
                  type="number"
                  prefix={<CalendarOutlined style={{ color: "#667eea" }} />}
                  placeholder="Age"
                  className={styles["form-input"]}
                />
              </Form.Item>

              <Form.Item
                name="gender"
                style={{ flex: 1, marginBottom: 0 }}
                rules={[{ required: true, message: "Gender is required!" }]}
              >
                <Select
                  placeholder="Gender"
                  className={styles["form-input"]}
                  dropdownStyle={{ borderRadius: "10px" }}
                  suffixIcon={
                    <UserSwitchOutlined style={{ color: "#667eea" }} />
                  }
                >
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                  <Select.Option value="other">Other</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              name="address"
              rules={[{ required: true, message: "Address is required!" }]}
            >
              <Input
                prefix={<HomeOutlined style={{ color: "#667eea" }} />}
                placeholder="Address"
                className={styles["form-input"]}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmit}
                block
                className={styles["submit-button"]}
              >
                Register
              </Button>
            </Form.Item>

            <div className={styles["login-text"]}>
              Already have an account?{" "}
              <Link to="/login" className={styles["login-link"]}>
                Login
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
