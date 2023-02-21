import React, { useContext, useEffect } from 'react'

import { StoreContext } from '../../store/StoreProvider';
import WeatherHourly from '../WeatherHourly/WeatherHourly';
import { useParams } from 'react-router';
import { weatherRequest } from '../../helpers/requests';

const Hourly = () => {
    const { lat, lon } = useParams()
    const { weatherData: { hourly }, updateWeatherData } = useContext(StoreContext)

    useEffect(() => {
        const params = {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            hourly: 'temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,surface_pressure,cloudcover,windspeed_10m'
        }
        weatherRequest.get('forecast', { params })
            .then(res => {
                const { hourly_units, hourly } = res.data;

                const splitDate = []
                hourly.time.forEach(item => {
                    const [d, t] = item.split("T")
                    splitDate.push(d.replaceAll("-", "_"))
                })

                const reducedDate = [...new Set(splitDate)]

                let lastIndex = 0
                const dataArray = Array.from({ length: 7 }).map((day, i) => {
                    const hours = Array.from({ length: 24 }).map((hour, j) => {
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
                const entries = Object.entries(hourly_units).map(entry => entry[0])
                const units = hourly_units
                delete units.time

                const data = {
                    units,
                    days: reducedDate,
                    entries,
                    data: dataArray
                }

                updateWeatherData(data, 'hourly')
            })
    }, [lat, lon])
    return (
        <WeatherHourly
            units={hourly.units}
            data={hourly.data}
            entries={hourly.entries}
            days={hourly.days}
        />
    );
}

export default Hourly;