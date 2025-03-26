"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Trash, Edit, Save, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateTask, deleteTask } from "../lib/features/tasks/tasksSlice"
import type { Task } from "../lib/types"
import WeatherInfo from "./weather-info"

interface TaskItemProps {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(task.text)
  const [editedPriority, setEditedPriority] = useState(task.priority)
  const dispatch = useDispatch()

  const handleToggleComplete = () => {
    dispatch(
      updateTask({
        ...task,
        completed: !task.completed,
      }),
    )
  }

  const handleSaveEdit = () => {
    if (editedText.trim()) {
      dispatch(
        updateTask({
          ...task,
          text: editedText,
          priority: editedPriority,
        }),
      )
      setIsEditing(false)
    }
  }

  const handleDelete = () => {
    dispatch(deleteTask(task.id))
  }

  const priorityColors = {
    high: "bg-red-100 text-red-800 hover:bg-red-200",
    medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    low: "bg-green-100 text-green-800 hover:bg-green-200",
  }

  return (
    <Card
      className={`border-l-4 ${task.completed ? "border-l-green-500" : `border-l-${task.priority === "high" ? "red" : task.priority === "medium" ? "yellow" : "green"}-500`}`}
    >
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Checkbox checked={task.completed} onCheckedChange={handleToggleComplete} id={`task-${task.id}`} />
            <Badge className={priorityColors[task.priority as keyof typeof priorityColors]}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Badge>
          </div>

          <div className="flex-grow">
            {isEditing ? (
              <div className="space-y-2">
                <Input value={editedText} onChange={(e) => setEditedText(e.target.value)} className="w-full" />
                <Select value={editedPriority} onValueChange={setEditedPriority}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className={`text-lg ${task.completed ? "line-through text-gray-500" : ""}`}>{task.text}</div>
            )}

            {task.location && (
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Cloud className="h-4 w-4 mr-1" />
                <span>Location: {task.location}</span>
              </div>
            )}

            {task.weather && <WeatherInfo weather={task.weather} />}
          </div>

          <div className="flex gap-2 mt-2 md:mt-0">
            {isEditing ? (
              <Button size="sm" variant="outline" onClick={handleSaveEdit}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
            <Button size="sm" variant="destructive" onClick={handleDelete}>
              <Trash className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

