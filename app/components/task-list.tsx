"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { RootState } from "../lib/store"
import TaskItem from "./task-item"
import type { Task } from "../lib/types"

export default function TaskList() {
  const [filter, setFilter] = useState("all")
  const tasks = useSelector((state: RootState) => state.tasks.tasks)

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    if (filter === "high") return task.priority === "high"
    if (filter === "medium") return task.priority === "medium"
    if (filter === "low") return task.priority === "low"
    return true
  })

  // Sort tasks by priority and creation date
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    const priorityDiff =
      priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder]

    if (priorityDiff !== 0) return priorityDiff

    // If same priority, sort by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="mb-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="high">High</TabsTrigger>
            <TabsTrigger value="medium">Medium</TabsTrigger>
            <TabsTrigger value="low">Low</TabsTrigger>
          </TabsList>
        </Tabs>

        {sortedTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No tasks found. Add some tasks to get started!</div>
        ) : (
          <div className="space-y-4">
            {sortedTasks.map((task: Task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

