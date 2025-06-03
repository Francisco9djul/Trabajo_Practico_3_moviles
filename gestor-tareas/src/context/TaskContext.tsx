import React, { createContext, useContext, useState } from 'react';

type TaskContextType = {
  tasks: string[];
  addTask: (task: string) => void;
  editTask: (index: number, newTask: string) => void;
  deleteTask: (index: number) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = (task: string) => {
    setTasks((prev) => [...prev, task]);
  };

  const editTask = (index: number, newTask: string) => {
    setTasks((prev) =>
      prev.map((t, i) => (i === index ? newTask : t))
    );
  };

  const deleteTask = (index: number) => {
  console.log('Eliminando tarea con índice:', index);
  setTasks((prev) => prev.filter((_, i) => i !== index));
};

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
};
