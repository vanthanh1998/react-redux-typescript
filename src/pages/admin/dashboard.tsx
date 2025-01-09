import { Card, Typography, Layout, theme } from "antd";
import { useAppSelector } from "../../redux/hooks";

const { Content } = Layout;

const DashboardPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { token } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "24px" }}>
        <Card
          style={{
            marginTop: "16px",
            borderRadius: token.borderRadiusLG,
            boxShadow: token.boxShadow,
          }}
        >
          <Typography.Paragraph>
            Welcome Super Admin: {user?.email}
          </Typography.Paragraph>
        </Card>
      </Content>
    </Layout>
  );
};

export default DashboardPage;
