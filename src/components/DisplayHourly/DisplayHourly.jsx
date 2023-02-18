import React, { useContext, useEffect } from 'react'

import { StoreContext } from '../../store/StoreProvider';
import { useParams } from 'react-router';
import { weatherRequest } from '../../helpers/requests';

const DisplayHourly = () => {
    const { lat, lon } = useParams()
    const { weatherData, updateWeatherData } = useContext(StoreContext)

    useEffect(() => {
        weatherRequest.get(`forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`)
            .then(res => {
                updateWeatherData(res.data, 'hourly')
            })
    }, [lat, lon])

    // console.log(weatherData.hourly);

    return (
        <div>
            Godzinowo
        </div>
    );
}

export default DisplayHourly;