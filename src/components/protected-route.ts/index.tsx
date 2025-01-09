import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import NotPermitted from "../common/not-permitted";
import Loading from "../common/loading";

const RoleBaseRoute = (props: any) => {
  const user = useAppSelector((state) => state.auth.user);
  const userRole = user?.role;

  if ((user && userRole === "USER") || !userRole) {
    return <NotPermitted />;
  } else {
    return <>{props.children}</>;
  }
};

const ProtectedRoute = (props: any) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  return (
    <>
      {isLoading === true ? (
        <Loading />
      ) : (
        <>
          {isAuthenticated === true ? (
            <>
              <RoleBaseRoute>{props.children}</RoleBaseRoute>
            </>
          ) : (
            <Navigate to="/login" replace />
          )}
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
