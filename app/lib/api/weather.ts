import type { WeatherData } from "../types"

// This is a mock API function that simulates fetching weather data
export async function fetchWeatherForLocation(location: string): Promise<WeatherData> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Generate random weather data based on the location
  const conditions = [
    "Sunny",
    "Partly Cloudy",
    "Cloudy",
    "Rainy",
    "Thunderstorm",
    "Snowy",
    "Foggy",
    "Clear",
    "Windy",
    "Humid",
  ]

  // Use the location string to deterministically select a condition
  const conditionIndex = location.length % conditions.length
  const condition = conditions[conditionIndex]

  // Generate a random temperature between 0 and 35°C
  const temperature =  Math.floor(Math.random() * 36)

  return {
    location,
    temperature,
    condition,
    unit: "C",
    humidity: Math.floor(Math.random() * 100),
    windSpeed:  Math.floor(Math.random() * 30),
  }
}

