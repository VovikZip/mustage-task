import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';
import type { Task, TaskInput } from '../types/task';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../store/taskSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: tasks,
    loading,
    error,
    creating,
    createError,
    updating,
    updateError,
    deleting,
    deleteError,
  } = useSelector((state: RootState) => state.tasks);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const [visibleCreateError, setVisibleCreateError] = useState(false);
  const [visibleUpdateError, setVisibleUpdateError] = useState(false);
  const [visibleDeleteError, setVisibleDeleteError] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    if (createError) {
      setVisibleCreateError(true);
      const timer = setTimeout(() => setVisibleCreateError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [createError]);

  useEffect(() => {
    if (updateError) {
      setVisibleUpdateError(true);
      const timer = setTimeout(() => setVisibleUpdateError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [updateError]);

  useEffect(() => {
    if (deleteError) {
      setVisibleDeleteError(true);
      const timer = setTimeout(() => setVisibleDeleteError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [deleteError]);

  const handleSaveTask = async (data: TaskInput) => {
    if (editingTask) {
      await dispatch(updateTask({ id: editingTask.id, data }));
    } else {
      await dispatch(createTask(data));
    }
    setShowForm(false);
    setEditingTask(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = async (id: number) => {
    await dispatch(deleteTask(id));
  };

  const handleFilter = (status: 'all' | 'pending' | 'completed') => {
    if (status === 'all') {
      setFilteredTasks(tasks);
    } else {
      const completed = status === 'completed';
      setFilteredTasks(tasks.filter((t) => t.completed === completed));
    }
  };

  const handleSearch = (query: string) => {
    const filtered = tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => {
              setEditingTask(null);
              setShowForm(true);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
          >
            + Add Task
          </button>
        </div>

        {showForm && (
          <TaskForm
            onSave={handleSaveTask}
            initialTask={editingTask}
            onClose={() => setShowForm(false)}
          />
        )}

        {creating && <div className="text-blue-600 mb-2">Creating task...</div>}
        {visibleCreateError && (
          <div className="text-red-600 mb-2 transition-opacity duration-500 ease-in-out opacity-100">
            ❌ {createError}
          </div>
        )}

        {updating && <div className="text-blue-600 mb-2">Updating task...</div>}
        {visibleUpdateError && (
          <div className="text-red-600 mb-2 transition-opacity duration-500 ease-in-out opacity-100">
            ❌ {updateError}
          </div>
        )}

        {deleting && <div className="text-blue-600 mb-2">Deleting task...</div>}
        {visibleDeleteError && (
          <div className="text-red-600 mb-2 transition-opacity duration-500 ease-in-out opacity-100">
            ❌ {deleteError}
          </div>
        )}

        <FilterBar onFilter={handleFilter} onSearch={handleSearch} />

        {loading ? (
          <div className="text-center text-blue-600 mt-10">Loading tasks...</div>
        ) : error ? (
          <div className="text-center text-red-600 mt-10 flex flex-col items-center gap-2">
            <div>Failed to load tasks: {error}</div>
            <button
              onClick={() => dispatch(fetchTasks())}
              className="text-red-600 hover:text-red-800 transition duration-200 text-2xl"
              title="Reload tasks"
            >
              ↻
            </button>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
