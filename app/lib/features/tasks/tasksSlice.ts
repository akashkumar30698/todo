import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Task } from "../../types"

interface TasksState {
  tasks: Task[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: TasksState = {
  tasks: [],
  status: "idle",
  error: null,
}

// Async thunks
export const loadTasks = createAsyncThunk("tasks/loadTasks", async () => {
  try {
    const tasksJson = localStorage.getItem("tasks")
    return tasksJson ? JSON.parse(tasksJson) : []
  } catch (error) {
    console.error("Failed to load tasks from localStorage:", error)
    return []
  }
})

export const addTask = createAsyncThunk("tasks/addTask", async (task: Task, { dispatch, getState }) => {
  // Add the task to the state first
  dispatch(addTaskLocal(task))

  // Then save all tasks to localStorage
  const state = getState() as { tasks: TasksState }
  localStorage.setItem("tasks", JSON.stringify(state.tasks.tasks))

  return task
})

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTaskLocal: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = action.payload
        // Save to localStorage
        localStorage.setItem("tasks", JSON.stringify(state.tasks))
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
      // Save to localStorage
      localStorage.setItem("tasks", JSON.stringify(state.tasks))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.pending, (state) => {
        state.status = "loading"
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.tasks = action.payload
      })
      .addCase(loadTasks.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to load tasks"
      })
  },
})

export const { addTaskLocal, updateTask, deleteTask } = tasksSlice.actions
export default tasksSlice.reducer

