import React, { createContext, useCallback, useEffect, useState } from 'react'
import { defaultParams, initData, initLocation } from '../helpers/defaults'

import axios from 'axios'
import { weatherRequest } from '../helpers/requests'

export const StoreContext = createContext(null)

const StoreProvider = ({ children }) => {

    const [currentParams, setCurrentParams] = useState(defaultParams)
    const [currentLocation, setCurrentLocation] = useState(initLocation)
    const [rawWeatherData, setRawWeatherData] = useState(undefined)
    const [weatherData, setWeatherData] = useState(initData)

    const updateWeatherData = (data, type) => setWeatherData(prev => { return { ...prev, [type]: data } })
    const updateParams = (city, lat, lon, type) => {
        setCurrentLocation(city)
        setCurrentParams({ lat, lon, type })
    }


    useEffect(() => {
        const params = {
            latitude: parseFloat(currentParams.lat),
            longitude: parseFloat(currentParams.lon),
            hourly: 'temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,surface_pressure,cloudcover,windspeed_10m',
            daily: 'temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum',
            timezone: currentLocation.timezone
        }
        weatherRequest.get('forecast', { params }).then(res => {
            const { hourly, hourly_units, daily, daily_units } = res.data
            setRawWeatherData({ hourly, daily, hourly_units, daily_units })
        })
    }, [currentParams.lat, currentParams.lon])

    useEffect(() => {
        if (rawWeatherData !== undefined) {
            transformHourlyData(rawWeatherData)
            transformDailyData(rawWeatherData)
        }
    }, [rawWeatherData])

    const transformHourlyData = (rawData) => {
        const { hourly_units, hourly } = rawData;

        const splitDate = []
        hourly.time.forEach(item => {
            const [d, t] = item.split("T")
            splitDate.push(d.replaceAll("-", "_"))
        })

        const reducedDate = [...new Set(splitDate)]

        let lastIndex = 0
        const dataArray = Array.from({ length: 7 }).map(() => {
            const hours = Array.from({ length: 24 }).map(() => {
                const test = {
                    time: hourly.time[lastIndex].split("T")[1],
                    temperature_2m: hourly.temperature_2m[lastIndex],
                    relativehumidity_2m: hourly.relativehumidity_2m[lastIndex],
                    apparent_temperature: hourly.apparent_temperature[lastIndex],
                    precipitation: hourly.precipitation[lastIndex],
                    surface_pressure: hourly.surface_pressure[lastIndex],
                    cloudcover: hourly.cloudcover[lastIndex],
                    windspeed_10m: hourly.windspeed_10m[lastIndex],
                }
                lastIndex++
                return test
            })
            return hours
        })
        const units = hourly_units
        delete units.time

        const data = {
            units,
            days: reducedDate,
            data: dataArray
        }

        updateWeatherData(data, 'hourly')
    }

    const transformDailyData = (rawData) => {
        const { daily_units, daily } = rawData

        const dailyData = []
        Array.from({ length: 7 }).forEach((item, index) => {
            let cloudcover_avg = 0
            if (typeof weatherData.hourly.data === 'object') {
                weatherData.hourly.data[index]?.forEach(hour => {
                    cloudcover_avg += hour.cloudcover;
                })
            }

            dailyData.push({
                time: daily.time[index],
                temperature_2m_max: daily.temperature_2m_max[index],
                temperature_2m_min: daily.temperature_2m_min[index],
                apparent_temperature_max: daily.apparent_temperature_max[index],
                apparent_temperature_min: daily.apparent_temperature_min[index],
                sunrise: daily.sunrise[index].split("T")[1],
                sunset: daily.sunset[index].split("T")[1],
                precipitation_sum: daily.precipitation_sum[index],
                cloudcover_avg: (cloudcover_avg) / 24
            })
        })



        const dailyWeather = {
            units: daily_units,
            data: dailyData
        }

        updateWeatherData(dailyWeather, 'daily')
    }

    return (
        <StoreContext.Provider value={{
            currentParams,
            weatherData,
            currentLocation,
            updateParams,
            updateWeatherData
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreProvider;