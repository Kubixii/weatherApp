import React, { useEffect } from 'react'

import { StoreContext } from '../../store/StoreProvider'
import { useContext } from 'react'
import { useParams } from 'react-router'
import { weatherRequest } from '../../helpers/requests'

const DisplayWeek = () => {
    const { lat, lon } = useParams()
    const { weatherData, updateWeatherData, currentLocation } = useContext(StoreContext)

    useEffect(() => {
        const params = {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            daily: 'temperature_2m_max,temperature_2m_min',
            timezone: currentLocation.timezone
        }
        weatherRequest.get('forecast', { params })
            .then(res => {
                updateWeatherData(res.data, 'daily')
            })
    }, [lat, lon])


    return (
        <div>
            Dziennie
        </div>
    );
}

export default DisplayWeek;