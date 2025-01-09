import { Button, Form, Input, App } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { callLogin, callLogout } from "../../config/api";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLogoutAction, setUserLoginInfo } from "../../redux/slice/authSlice";
import styles from "styles/auth.module.scss";
import { useAppSelector } from "../../redux/hooks";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { message } = App.useApp();

  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const callback = params?.get("callback");

  useEffect(() => {
    const checkAuth = async () => {
      const res = await callLogout();
      if (res && res.data) {
        dispatch(setLogoutAction({}));
      }
      if (isAuthenticated) {
        window.location.href = "/";
      }
    };
    checkAuth();
  }, []);

  const onFinish = async (values: any) => {
    const { username, password } = values;
    setIsSubmit(true);
    const res = await callLogin(username, password);
    setIsSubmit(false);
    if (res?.data) {
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(setUserLoginInfo(res.data.user));
      message.success("Login successful!");
      window.location.href = callback ? callback : "/";
    } else {
      message.error("Username or Password is incorrect");
    }
  };

  return (
    <div className={styles["register-page"]}>
      <div className={styles["form-container"]}>
        <div className={styles["form-wrapper"]}>
          <h2 className={styles["page-title"]}>Login</h2>

          <Form
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            size="large"
            style={{ width: "100%" }}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Email is required!" },
                { type: "email", message: "Invalid email format!" },
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "#667eea" }} />}
                placeholder="Email"
                className={styles["form-input"]}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Password is required!" }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#667eea" }} />}
                placeholder="Password"
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
                Login
              </Button>
            </Form.Item>

            <div className={styles["login-text"]}>
              Don't have an account?{" "}
              <Link to="/register" className={styles["login-link"]}>
                Register
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
