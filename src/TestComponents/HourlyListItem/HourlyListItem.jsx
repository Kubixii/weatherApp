import React, { useEffect } from 'react'

import bemCssModules from 'bem-css-modules'
import clearDay from './assets/clearDay.png'
import clearNight from './assets/clearNight.png'
import cloudy from './assets/cloudy.png'
import { default as hourlylistitemStyles } from './HourlyListItem.module.scss'
import partlyCloudyDay from './assets/partlyCloudyDay.png'
import partlyCloudyNight from './assets/partlyCloudyNight.png'
import { tempHourlyListItem } from '../../helpers/defaults'
import { useState } from 'react'

const style = bemCssModules(hourlylistitemStyles)

const HourlyListItem = () => {
    const {
        time,
        temperature,
        relativehumidity,
        apparent_temperature,
        precipitation,
        surface_pressure,
        cloudcover,
        windspeed
    } = tempHourlyListItem

    const [icon, setIcon] = useState(null)

    useEffect(() => {
        switch (true) {
            case cloudcover.value <= 33: {
                const timeInt = parseInt(time.slice(2))
                if (timeInt > 6 && timeInt < 22) setIcon(clearDay)
                else setIcon(clearNight)
                break;
            }
            case cloudcover.value <= 66: {
                if (timeInt > 6 && timeInt < 22) setIcon(partlyCloudyDay)
                else setIcon(partlyCloudyNight)
                break;
            }
            case cloudcover.value <= 100: {
                setIcon(cloudy)
                break;
            }
        }
    }, [])
    return (
        <div className={style()}>
            <div className={style('timeTemperature')}>
                <p>{time.value}</p>
            </div>
            <div className={style('weatherIcon')}>
                <img src={icon} alt="icon" />
            </div>
            <div className={style('mainWeatherData')}>
                <p>{`${temperature.value}${temperature.unit}`}</p>
                <p>apparent: <span>{`${apparent_temperature.value}${apparent_temperature.unit}`}</span></p>
            </div>
            <div className={style('restWeatherData')}>
                <p>humidity:<span>{` ${relativehumidity.value}${relativehumidity.unit}`}</span></p>
                <p>windspeed:<span>{` ${windspeed.value}${windspeed.unit}`}</span></p>
                <p>precipitation:<span>{` ${precipitation.value}${precipitation.unit}`}</span></p>
                <p>pressure:<span>{` ${surface_pressure.value}${surface_pressure.unit}`}</span></p>
            </div>
        </div>
    );
}

export default HourlyListItem;