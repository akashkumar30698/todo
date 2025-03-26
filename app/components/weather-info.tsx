import { Cloud, Droplets, Sun, CloudRain, Snowflake } from "lucide-react"
import type { WeatherData } from "../lib/types"

interface WeatherInfoProps {
  weather: WeatherData
}

export default function WeatherInfo({ weather }: WeatherInfoProps) {
  if (!weather) return null

  const getWeatherIcon = () => {
    const condition = weather.condition.toLowerCase()

    if (condition.includes("rain") || condition.includes("drizzle")) {
      return <CloudRain className="h-4 w-4 text-blue-500" />
    } else if (condition.includes("cloud")) {
      return <Cloud className="h-4 w-4 text-gray-500" />
    } else if (condition.includes("sun") || condition.includes("clear")) {
      return <Sun className="h-4 w-4 text-yellow-500" />
    } else if (condition.includes("snow")) {
      return <Snowflake className="h-4 w-4 text-blue-300" />
    } else if (condition.includes("humid") || condition.includes("mist")) {
      return <Droplets className="h-4 w-4 text-blue-400" />
    } else {
      return <Cloud className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="mt-2 text-sm text-gray-600 flex items-center gap-3">
      <div className="flex items-center">
        {getWeatherIcon()}
        <span className="ml-1">{weather.condition}</span>
      </div>
      <div className="flex items-center">
        <span>
          {weather.temperature}°{weather.unit}
        </span>
      </div>
    </div>
  )
}

