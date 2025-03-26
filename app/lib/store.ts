import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/auth/authSlice"
import tasksReducer from "./features/tasks/tasksSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["tasks/addTask/fulfilled", "tasks/loadTasks/fulfilled"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.weather"],
        // Ignore these paths in the state
        ignoredPaths: ["tasks.tasks"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

