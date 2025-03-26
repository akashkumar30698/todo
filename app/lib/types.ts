export interface Task {
    id: string
    text: string
    completed: boolean
    priority: string
    createdAt: string
    location?: string | null
    weather?: WeatherData | null
  }
  
  export interface WeatherData {
    location: string
    temperature: number
    condition: string
    unit: string
    humidity: number
    windSpeed: number
  }
  
  