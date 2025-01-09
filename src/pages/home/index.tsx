import { useNavigate } from "react-router-dom";
import { callLogout } from "../../config/api";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setLogoutAction } from "../../redux/slice/authSlice";
import { App } from "antd";

const Dashboard = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(setLogoutAction({}));
      message.success("Đăng xuất thành công");
      navigate("/login");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <div>Welcome {user?.email}</div>
      {isAuthenticated === true ? (
        <button
          onClick={handleLogout}
          style={{
            marginTop: "20px",
            padding: "8px 16px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Đăng xuất
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
