import React, { useContext, useEffect, useState } from 'react'

import { StoreContext } from '../../store/StoreProvider'
import TemperatureDisplay from '../TemperatureDisplay/TemperatureDisplay'
import bemCssModules from 'bem-css-modules'
import clearDay from './assets/clearDay.png'
import clearNight from './assets/clearNight.png'
import cloudy from './assets/cloudy.png'
import { defaultDayData } from '../../helpers/defaults'
import partlyCloudyDay from './assets/partlyCloudyDay.png'
import partlyCloudyNight from './assets/partlyCloudyNight.png'
import sunrise from './assets/sunrise.png'
import sunset from './assets/sunset.png'
import { default as todaysweatherStyles } from './TodaysWeather.module.scss'

const style = bemCssModules(todaysweatherStyles)

const TodaysWeather = () => {
    const { weatherData: { daily: { units, data } } } = useContext(StoreContext)

    const todayData = data !== undefined ? data[0] : defaultDayData.data
    const todayUnits = data !== undefined ? units : defaultDayData.units

    const [icon, setIcon] = useState(null)
    useEffect(() => {
        const timeInt = parseInt(todayData.time.slice(0, 2))
        switch (true) {
            case todayData.cloudcover_avg <= 33: {
                if (timeInt > 6 && timeInt < 22) setIcon(clearDay)
                else setIcon(clearNight)
                break;
            }
            case todayData.cloudcover_avg <= 66: {
                if (timeInt > 6 && timeInt < 22) setIcon(partlyCloudyDay)
                else setIcon(partlyCloudyNight)
                break;
            }
            case todayData.cloudcover_avg <= 100: {
                setIcon(cloudy)
                break;
            }
        }
    }, [])

    return (
        <div className={style()}>
            <div>
                <div>
                    <p>lowest temperature</p>
                    <TemperatureDisplay
                        unit={todayUnits.temperature_2m_min}
                        value={todayData.temperature_2m_min}
                    />
                    <TemperatureDisplay
                        unit={todayUnits.apparent_temperature_min}
                        value={todayData.apparent_temperature_min}
                        isApparent
                    />
                </div>
                <div className={style('sunrise')}>
                    <div className={style('sunIconWrapper')}>
                        <img src={sunrise} alt="sunrise" />
                    </div>
                    <p>sunrise: <span>{todayData.sunrise}</span></p>
                </div>
            </div>
            <div>
                <div className={style('time')}>
                    <p>{todayData.time}</p>
                </div>
                <div className={style('imageWrapper')}>
                    <img src={icon} alt="icon" />
                </div>
                <div className={style('precipitation')}>
                    <p>precipitation: <span>{`${todayData.precipitation_sum} ${todayUnits.precipitation_sum}`}</span></p>
                </div>
            </div>
            <div>
                <div>
                    <p>highest temperature</p>
                    <TemperatureDisplay
                        unit={todayUnits.temperature_2m_max}
                        value={todayData.temperature_2m_max}
                    />
                    <TemperatureDisplay
                        unit={todayUnits.apparent_temperature_max}
                        value={todayData.apparent_temperature_max}
                        isApparent
                    />
                </div>
                <div className={style('sunset')}>
                    <div className={style('sunIconWrapper')}>
                        <img src={sunset} alt="sunset" />
                    </div>
                    <p>sunset: <span>{todayData.sunset}</span></p>
                </div>
            </div>
        </div>
    );
}

export default TodaysWeather;