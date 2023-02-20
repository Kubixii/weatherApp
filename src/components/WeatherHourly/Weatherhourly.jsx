import React from 'react'
import WeatherHourlyPerDay from '../WeatherHourlyPerDay/WeatherHourlyPerDay'

const Weatherhourly = ({
    units,
    data
}) => {
    const { temperature_2m, time } = data
    const splitDate = []
    const splitTime = []
    time.forEach(item => {
        const [d, t] = item.split("T")
        splitDate.push(d)
        splitTime.push(t)
    })
    const sliceIntoChunks = (arr, chunkSize) => {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }
    const combineArrays = (arr1, arr2) => {
        const combined = []
        for (let i = 0; i < arr1.length; i += 1) {
            combined.push([arr1[i], arr2[i]])
        }
        return combined
    }

    const reducedDate = [...new Set(splitDate)]
    const timeTemperatureData = combineArrays(
        sliceIntoChunks(splitTime, 24),
        sliceIntoChunks(temperature_2m, 24)
    )
    const hourlyDataList = reducedDate.map((time, index) => {
        return (
            <WeatherHourlyPerDay
                key={index}
                day={time}
                unit={units.temperature_2m}
                timeTemperature={timeTemperatureData[index]}
            />
        )
    })

    return (
        <div>
            {hourlyDataList}
        </div>
    );
}

export default Weatherhourly;