import React, { useEffect } from 'react'

import bemCssModules from 'bem-css-modules'
import clearDay from './assets/clearDay.png'
import clearNight from './assets/clearNight.png'
import cloudy from './assets/cloudy.png'
import { default as hourlylistitemStyles } from './HourlyListItem.module.scss'
import partlyCloudyDay from './assets/partlyCloudyDay.png'
import partlyCloudyNight from './assets/partlyCloudyNight.png'
import { useState } from 'react'

// import { tempHourlyListItem } from '../../helpers/defaults'


const style = bemCssModules(hourlylistitemStyles)

const HourlyListItem = ({
    time,
    temperature_2m,
    relativehumidity_2m,
    apparent_temperature,
    precipitation,
    surface_pressure,
    cloudcover,
    windspeed_10m,
    units,
}) => {
    const [icon, setIcon] = useState(null)
    useEffect(() => {
        const timeInt = parseInt(time.slice(0, 2))
        switch (true) {
            case cloudcover <= 33: {
                if (timeInt > 6 && timeInt < 22) setIcon(clearDay)
                else setIcon(clearNight)
                break;
            }
            case cloudcover <= 66: {
                if (timeInt > 6 && timeInt < 22) setIcon(partlyCloudyDay)
                else setIcon(partlyCloudyNight)
                break;
            }
            case cloudcover <= 100: {
                setIcon(cloudy)
                break;
            }
        }
    }, [])
    return (
        <div className={style()}>
            <div className={style('timeTemperature')}>
                <p>{time}</p>
            </div>
            <div className={style('weatherIcon')}>
                <img src={icon} alt="icon" />
            </div>
            <div className={style('mainWeatherData')}>
                <p>{`${temperature_2m}${units['temperature_2m']}`}</p>
                <p>apparent: <span>{`${apparent_temperature}${units['apparent_temperature']}`}</span></p>
            </div>
            <div className={style('restWeatherData')}>
                <p>humidity:<span>{` ${relativehumidity_2m}${units['relativehumidity_2m']}`}</span></p>
                <p>windspeed:<span>{` ${windspeed_10m}${units['windspeed_10m']}`}</span></p>
                <p>precipitation:<span>{` ${precipitation}${units['precipitation']}`}</span></p>
                <p>pressure:<span>{` ${surface_pressure}${units['surface_pressure']}`}</span></p>
            </div>
        </div>
    );
}

export default HourlyListItem;