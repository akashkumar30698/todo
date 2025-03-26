"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "../lib/store"
import { Button } from "@/components/ui/button"
import { logout } from "../lib/features/auth/authSlice"
import { loadTasks } from "../lib/features/tasks/tasksSlice"
import TaskInput from "./task-input"
import TaskList from "./task-list"
import type { RootState } from "../lib/store"

export default function TaskDashboard() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { username } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Load tasks from localStorage on component mount
    dispatch(loadTasks())
  }, [dispatch])

  const handleLogout = () => {
    // Clear auth cookie
    document.cookie = "auth=; path=/; max-age=0"

    // Update Redux state
    dispatch(logout())

    router.push("/login")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Advanced Todo App</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {username || "User"}</span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <TaskInput />
          <TaskList />
        </div>
      </main>
    </div>
  )
}

