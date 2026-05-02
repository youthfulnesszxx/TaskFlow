import { Form, Input, InputNumber, Select, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useTaskStore } from '../store/useTaskStore';

const { TextArea } = Input;

interface TaskFormValues {
  title: string;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  dueDate?: string;
  reminderTime?: string;
}

export default function TaskForm() {
  const [form] = Form.useForm();
  const { addTask, fetchTasks } = useTaskStore();

  const onFinish = async (values: TaskFormValues) => {
    const taskData = {
      title: values.title,
      priority: values.priority || 'medium',
      category: values.category || '',
      completed: false,
      dueDate: values.dueDate ? dayjs(values.dueDate).toISOString() : null,
      reminderTime: values.reminderTime ? dayjs(values.reminderTime).toISOString() : null,
    };

    await addTask(taskData);
    await fetchTasks();
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="任务标题"
        name="title"
        rules={[{ required: true, message: '请输入任务标题' }]}
      >
        <Input placeholder="输入任务标题..." />
      </Form.Item>

      <Form.Item label="优先级" name="priority" initialValue="medium">
        <Select>
          <Select.Option value="low">低</Select.Option>
          <Select.Option value="medium">中</Select.Option>
          <Select.Option value="high">高</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="分类" name="category">
        <Input placeholder="例如：工作、学习、生活" />
      </Form.Item>

      <Form.Item label="截止日期" name="dueDate">
        <DatePicker showTime style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="提醒时间" name="reminderTime">
        <DatePicker showTime style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          添加任务
        </Button>
      </Form.Item>
    </Form>
  );
}
