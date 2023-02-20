import React, { useContext, useEffect } from 'react'

import { StoreContext } from '../../store/StoreProvider';
import Weatherhourly from '../WeatherHourly/Weatherhourly';
import { tempWeatherDataHourly } from '../../helpers/defaults';
import { useParams } from 'react-router';
import { weatherRequest } from '../../helpers/requests';

const Hourly = () => {
    const { lat, lon } = useParams()
    const { weatherData: { hourly }, updateWeatherData } = useContext(StoreContext)

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
        <Weatherhourly
            units={tempWeatherDataHourly.hourly_units}
            data={tempWeatherDataHourly.hourly}
        />
    );
}

export default Hourly;