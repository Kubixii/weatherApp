import React, { useRef, useState } from 'react'

import arrow from './assets/arrow.png'
import bemCssModules from 'bem-css-modules'
import { default as weatherhourlyperdayStyles } from './WeatherHourlyPerDay.module.scss'

const style = bemCssModules(weatherhourlyperdayStyles)

const WeatherHourlyPerDay = ({
    day,
    unit,
    timeTemperature
}) => {
    const [showList, setshowList] = useState(true)

    const toggleList = () => setshowList(!showList);

    const weatherDataList = Array.from({ length: 24 }).map((item, index) => (
        <div
            key={index}
            className={style('listItem')}
        >
            <p>{timeTemperature[0][index]}</p>
            <p>{`${timeTemperature[1][index]}${unit}`}</p>
        </div>
    ))
    return (
        <div className={style()}>
            <div
                className={style('date')}
                onClick={toggleList}
            >
                <p>{day}</p>
                <img src={arrow} alt="expand" />
            </div>
            <div
                className={style('tempList')}
                aria-hidden={showList}
            >
                {weatherDataList}
            </div>
        </div>
    );
}

export default WeatherHourlyPerDay;