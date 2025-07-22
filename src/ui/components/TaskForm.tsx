import React, { useState } from 'react';
import type { Task, TaskInput } from '../types/task';

interface TaskFormProps {
  onSave: (task: TaskInput) => void;
  initialTask?: Task | null;
  onClose?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSave, initialTask, onClose }) => {
  const [task, setTask] = useState<TaskInput>(
    initialTask ? {
      title: initialTask.title,
      description: initialTask.description,
      completed: initialTask.completed,
    } : {
      title: '',
      description: '',
      completed: false,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(task);
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-3 mb-3">
      <input
        type="text"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        placeholder="Task Title"
        className="w-full p-3 border border-gray-300 rounded-lg"
        required
      />
      <textarea
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        placeholder="Task Description"
        className="w-full p-3 border border-gray-300 rounded-lg"
      />
      <select
        value={task.completed ? 'completed' : 'pending'}
        onChange={(e) =>
          setTask({ ...task, completed: e.target.value === 'completed' })
        }
        className="w-full p-3 border border-gray-300 rounded-lg"
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <div className="flex justify-end gap-2">
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          Save
        </button>
        {onClose && (
          <button type="button" onClick={onClose} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
