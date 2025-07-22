// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';
// import type { Task, TaskInput } from '../types/task';

// export const fetchTasks = createAsyncThunk('tasks/fetchAll', async () => {
//   const res = await fetch('http://localhost:3000/api/tasks');
//   if (!res.ok) throw new Error('Failed to fetch tasks');
//   return (await res.json()) as Task[];
// });

// export const createTask = createAsyncThunk('tasks/create', async (data: TaskInput) => {
//   const res = await fetch('http://localhost:3000/api/tasks', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });
//   if (!res.ok) throw new Error('Failed to create task');
//   return (await res.json()) as Task;
// });

// export const updateTask = createAsyncThunk(
//   'tasks/update',
//   async ({ id, data }: { id: number; data: TaskInput }) => {
//     const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });
//     if (!res.ok) throw new Error('Failed to update task');
//     return (await res.json()) as Task;
//   }
// );

// export const deleteTask = createAsyncThunk('tasks/delete', async (id: number) => {
//   const res = await fetch(`http://localhost:3000/api/tasks/${id}`, { method: 'DELETE' });
//   if (!res.ok) throw new Error('Failed to delete task');
//   return id;
// });

// interface TaskState {
//   items: Task[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: TaskState = {
//   items: [],
//   loading: false,
//   error: null,
// };

// const taskSlice = createSlice({
//   name: 'tasks',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch
//       .addCase(fetchTasks.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
//         state.items = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchTasks.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message ?? 'Failed to load tasks';
//       })

//       // Create
//       .addCase(createTask.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
//         state.items.push(action.payload);
//         state.loading = false;
//       })
//       .addCase(createTask.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message ?? 'Failed to create task';
//       })

//       // Update
//       .addCase(updateTask.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
//         state.items = state.items.map((task) =>
//           task.id === action.payload.id ? action.payload : task
//         );
//         state.loading = false;
//       })
//       .addCase(updateTask.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message ?? 'Failed to update task';
//       })

//       // Delete
//       .addCase(deleteTask.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
//         state.items = state.items.filter((task) => task.id !== action.payload);
//         state.loading = false;
//       })
//       .addCase(deleteTask.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message ?? 'Failed to delete task';
//       });
//   },
// });

// export default taskSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Task, TaskInput } from '../types/task';

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async () => {
  const res = await fetch('http://localhost:3000/api/tasks');
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return (await res.json()) as Task[];
});

export const createTask = createAsyncThunk('tasks/create', async (data: TaskInput) => {
  const res = await fetch('http://localhost:3000/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return (await res.json()) as Task;
});

export const updateTask = createAsyncThunk(
  'tasks/update',
  async ({ id, data }: { id: number; data: TaskInput }) => {
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update task');
    return (await res.json()) as Task;
  }
);

export const deleteTask = createAsyncThunk('tasks/delete', async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete task');
  return id;
});

interface TaskState {
  items: Task[];
  loading: boolean;
  error: string | null;

  creating: boolean;
  createError: string | null;

  updating: boolean;
  updateError: string | null;

  deleting: boolean;
  deleteError: string | null;
}

const initialState: TaskState = {
  items: [],
  loading: false,
  error: null,

  creating: false,
  createError: null,

  updating: false,
  updateError: null,

  deleting: false,
  deleteError: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load tasks';
      });

    // Create
    builder
      .addCase(createTask.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.items.push(action.payload);
        state.creating = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.error.message ?? 'Failed to create task';
      });

    // Update
    builder
      .addCase(updateTask.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.items = state.items.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
        state.updating = false;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.error.message ?? 'Failed to update task';
      });

    // Delete
    builder
      .addCase(deleteTask.pending, (state) => {
        state.deleting = true;
        state.deleteError = null;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((task) => task.id !== action.payload);
        state.deleting = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.deleting = false;
        state.deleteError = action.error.message ?? 'Failed to delete task';
      });
  },
});

export default taskSlice.reducer;
