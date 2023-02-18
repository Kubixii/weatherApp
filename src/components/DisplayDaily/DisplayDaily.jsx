import React, { useEffect } from 'react'

import { StoreContext } from '../../store/StoreProvider'
import { useContext } from 'react'
import { useParams } from 'react-router'
import { weatherRequest } from '../../helpers/requests'

const DisplayDaily = () => {
    const { lat, lon } = useParams()
    const { weatherData, updateWeatherData, currentLocation } = useContext(StoreContext)

    useEffect(() => {
        const timezone = currentLocation.timezone?.replace("/", "%2F")
        // const timezone = currentLocation
        console.log(timezone);
        weatherRequest.get(`forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m&timezone=${timezone}`)
            .then(res => {
                updateWeatherData(res.data, 'daily')
            })
    }, [lat, lon])

    console.log(weatherData.daily);
    return (
        <div>
            Dziennie
        </div>
    );
}

export default DisplayDaily;