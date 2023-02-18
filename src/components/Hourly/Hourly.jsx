import React, { useContext, useEffect } from 'react'

import { StoreContext } from '../../store/StoreProvider';
import { useParams } from 'react-router';
import { weatherRequest } from '../../helpers/requests';

const DisplayHourly = () => {
    const { lat, lon } = useParams()
    const { weatherData, updateWeatherData } = useContext(StoreContext)

    useEffect(() => {
        const params = {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            hourly: 'temperature_2m'
        }
        weatherRequest.get('forecast', { params })
            .then(res => {
                updateWeatherData(res.data, 'hourly')
            })
    }, [lat, lon])

    return (
        <div>
            Godzinowo
        </div>
    );
}

export default DisplayHourly;