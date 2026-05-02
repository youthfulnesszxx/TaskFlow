import { List, Checkbox, Tag, Button, Space, Empty, Input } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { DeleteOutlined } from '@ant-design/icons';
import { useTaskStore, Task } from '../store/useTaskStore';
import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';

const MotionList = motion(List);

export default function TaskList() {
  const { tasks, updateTask, deleteTask, setFilter, filter } = useTaskStore();
  const [searchText, setSearchText] = useState(filter.q || '');
  const debouncedSearch = useDebounce(searchText, 300);

  // 根据优先级返回对应的 Tag 颜色
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'default';
    }
  };

  // 搜索变化时更新过滤器
  useEffect(() => {
    setFilter({ ...filter, q: debouncedSearch });
  }, [debouncedSearch]);

  const isEmpty = tasks.length === 0;

  return (
    <div>
      <Input.Search
        placeholder="搜索任务..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
        allowClear
      />

      {isEmpty ? (
        <Empty description="未搜索到任务" />
      ) : (
      <AnimatePresence>
        <MotionList
          itemLayout="horizontal"
          dataSource={tasks}
          renderItem={(task: Task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <List.Item
                actions={[
                  <Button
                    key="delete"
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => deleteTask(task.id)}
                  />,
                ]}
              >
                <List.Item.Meta
                  title={
                    <Space>
                      <Checkbox
                        checked={task.completed}
                        onChange={() =>
                          updateTask(task.id, { completed: !task.completed })
                        }
                      >
                        <span
                          style={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                            color: task.completed ? '#999' : 'inherit',
                          }}
                        >
                          {task.title}
                        </span>
                      </Checkbox>
                      <Tag color={getPriorityColor(task.priority)}>
                        {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                      </Tag>
                      {task.category && <Tag>{task.category}</Tag>}
                    </Space>
                  }
                  description={
                    <span>
                      {task.dueDate && (
                        <span>
                          截止：{new Date(task.dueDate).toLocaleDateString('zh-CN')}{' '}
                        </span>
                      )}
                      {task.reminderTime && (
                        <span>
                          提醒：{new Date(task.reminderTime).toLocaleString('zh-CN')}
                        </span>
                      )}
                    </span>
                  }
                />
              </List.Item>
            </motion.div>
          )}
        />
      </AnimatePresence>
      )}
    </div>
  );
}
