import { Button } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <Button
      type="text"
      icon={isDark ? <SunOutlined /> : <MoonOutlined />}
      onClick={onToggle}
      style={{ color: 'white', fontSize: 18 }}
      title={isDark ? '切换到浅色模式' : '切换到深色模式'}
    />
  );
}
