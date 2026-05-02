import { create } from 'zustand';
import axios from 'axios';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate: string | null;
  reminderTime: string | null;
}

interface TasksFilter {
  completed?: boolean;
  category?: string;
  q?: string;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filter: TasksFilter;

  // Actions
  setFilter: (filter: TasksFilter) => void;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TasksState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,
  filter: {},

  setFilter: (filter) => {
    set({ filter });
    get().fetchTasks();
  },

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const { filter } = get();
      const params = new URLSearchParams();
      if (filter.completed !== undefined) params.append('completed', String(filter.completed));
      if (filter.category) params.append('category', filter.category);
      if (filter.q) params.append('q', filter.q);

      const response = await axios.get(`/api/tasks?${params.toString()}`);
      // Map backend field names to frontend field names
      const mappedTasks = response.data.map((task: any) => ({
        id: task.id,
        title: task.title,
        completed: Boolean(task.completed),
        priority: task.priority,
        category: task.category || '',
        dueDate: task.due_date || null,
        reminderTime: task.reminder_time || null,
      }));
      set({ tasks: mappedTasks, loading: false });
    } catch (error) {
      console.error('fetchTasks error:', error);
      set({ error: 'Failed to fetch tasks', loading: false });
    }
  },

  addTask: async (task) => {
    const response = await axios.post('/api/tasks', task);
    await get().fetchTasks();
  },

  updateTask: async (id, updates) => {
    const response = await axios.put(`/api/tasks/${id}`, updates);
    await get().fetchTasks();
  },

  deleteTask: async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    await get().fetchTasks();
  },
}));
