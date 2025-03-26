"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { addTask } from "../lib/features/tasks/tasksSlice"
import { fetchWeatherForLocation } from "../lib/api/weather"
import { toast } from "sonner"
import type { AppDispatch } from "../lib/store"

export default function TaskInput() {
  const [text, setText] = useState("")
  const [location, setLocation] = useState("")
  const [priority, setPriority] = useState("medium")
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!text.trim()) {
      toast(
       "Please enter a task description"
      )
      return
    }

    setIsLoading(true)

    try {
      let weatherData = null

      // Only fetch weather if location is provided
      if (location.trim()) {
        try {
          weatherData = await fetchWeatherForLocation(location)
        } catch (error) {
          console.log(error)
          toast(
         "Could not fetch weather for the specified location"
          )
        }
      }

      dispatch(
        addTask({
          id: Date.now().toString(),
          text,
          priority,
          completed: false,
          createdAt: new Date().toISOString(),
          weather: weatherData,
          location: location.trim() || null,
        }),
      )

      setText("")
      setLocation("")
      setPriority("medium")

      toast(
      "Your task has been added successfully"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task">Task</Label>
            <Input
              id="task"
              placeholder="What needs to be done?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location (optional)</Label>
              <Input
                id="location"
                placeholder="e.g., New York"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority} disabled={isLoading}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Task"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

