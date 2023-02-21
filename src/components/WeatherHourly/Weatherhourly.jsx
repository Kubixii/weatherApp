import React, { useState } from 'react'

import HourlyListItem from '../../TestComponents/HourlyListItem/HourlyListItem';
import arrow from './assets/arrow.png'
import bemCssModules from 'bem-css-modules'
import { default as weatherhourlyStyles } from './Weatherhourly.module.scss'

const style = bemCssModules(weatherhourlyStyles)

const WeatherHourly = ({
    units,
    data,
    entries,
    days
}) => {
    const [showList, setshowList] = useState(true)
    const toggleList = () => setshowList(!showList);

    const hourlyDataList = data !== undefined ? data?.map((day, index) => {

        const listElements = day.map((hour, idx) => {
            return (<HourlyListItem
                key={idx}
                time={hour.time}
                temperature_2m={hour.temperature_2m}
                relativehumidity_2m={hour.relativehumidity_2m}
                apparent_temperature={hour.apparent_temperature}
                precipitation={hour.precipitation}
                surface_pressure={hour.surface_pressure}
                cloudcover={hour.cloudcover}
                windspeed_10m={hour.windspeed_10m}
                units={units}
            />)
        })
        //FIX THING HERE
        return (
            <React.Fragment key={days[index]}>
                <div
                    className={style('date')}
                    onClick={toggleList}
                >
                    <p>{days[index]}</p>
                    <img
                        src={arrow}
                        alt="expand" />
                </div>
                <div
                    className={style('tempList')}
                    aria-hidden={showList}
                >
                    {listElements}
                </div>
            </React.Fragment>
        )
    }) : []

    return (
        <div className={style()}>
            {hourlyDataList}
        </div>
    );
}

export default WeatherHourly;