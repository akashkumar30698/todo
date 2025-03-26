import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import TaskDashboard from "./components/task-dashboard"

export default async function Home() {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.has("auth")

  if (!isAuthenticated) {
    redirect("/login")
  }

  return <TaskDashboard />
}

