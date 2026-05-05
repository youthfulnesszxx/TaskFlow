import { Layout, Card, Progress, Button, Tooltip } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import ThemeToggle from "../components/ThemeToggle";
import { useTaskStore } from "../store/useTaskStore";
import { useDarkMode } from "../hooks/useDarkMode";
import { useEffect, useState } from "react";

const { Header, Content, Footer } = Layout;

const backgroundImages = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
];

function HomePage() {
  const { tasks, fetchTasks } = useTaskStore();
  const { isDark, toggle } = useDarkMode();
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage = `url("${backgroundImages[imageIndex]}")`;
  }, [imageIndex]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const completionRate =
    tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  const handleSwitchBackground = () => {
    setImageIndex((prev) => (prev + 1) % backgroundImages.length);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "white", margin: 0 }}>TaskFlow</h1>
        <ThemeToggle isDark={isDark} onToggle={toggle} />
      </Header>
      <Content
        style={{
          padding: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Card
          style={{ marginBottom: 24 }}
          bodyStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Progress
              type="circle"
              percent={Math.round(completionRate)}
              size={60}
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
            />
            <div>
              <h3 style={{ margin: 0 }}>完成率统计</h3>
              <p style={{ margin: 0, color: "#666" }}>
                已完成 {completedCount} / 总共 {tasks.length} 项任务
              </p>
            </div>
          </div>
          <Tooltip
            title={
              completionRate < 100 ? "完成度未达到100%时不可切换背景图哦~" : ""
            }
          >
            <Button
              icon={<PictureOutlined />}
              onClick={handleSwitchBackground}
              disabled={completionRate < 100}
            >
              切换背景
            </Button>
          </Tooltip>
        </Card>

        <Card title="任务列表" style={{ marginBottom: 24 }}>
          <TaskList />
        </Card>

        <Card>
          <TaskForm />
        </Card>
      </Content>
      <Footer style={{ height: "700px", background: "transparent" }}></Footer>
    </Layout>
  );
}

export default HomePage;
