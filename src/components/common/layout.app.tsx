import { message } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setRefreshTokenAction } from "../../redux/slice/authSlice";

interface IProps {
  children: React.ReactNode;
}

const LayoutApp = (props: IProps) => {
  const isRefreshToken = useAppSelector((state) => state.auth.isRefreshToken);
  const errorRefreshToken = useAppSelector(
    (state) => state.auth.errorRefreshToken
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //handle refresh token error
  useEffect(() => {
    if (isRefreshToken === true) {
      localStorage.removeItem("access_token");
      message.error(errorRefreshToken);
      dispatch(setRefreshTokenAction({ status: false, message: "" }));
      navigate("/login");
    }
  }, [isRefreshToken]);

  return <>{props.children}</>;
};

export default LayoutApp;
