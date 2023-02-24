import HourlyListItem from '../HourlyListItem/HourlyListItem'
import ListWrapper from '../ListWrapper/ListWrapper';
import React, { useContext } from 'react'
import { StoreContext } from '../../store/StoreProvider';

const WeatherHourly = ({
    units,
    data,
    days
}) => {

    const { units, days, data } = useContext(StoreContext)
    const hourlyDataList = data !== undefined ? data?.map((day, index) => {

        const listElements = day.map((hour, idx) => (
            <HourlyListItem
                key={idx}
                time={hour.time}
                temperature_2m={hour.temperature_2m}
                relativehumidity_2m={hour.relativehumidity_2m}
                apparent_temperature={hour.apparent_temperature}
                precipitation={hour.precipitation}
                surface_pressure={hour.surface_pressure}
                cloudcover={hour.cloudcover}
                windspeed_10m={hour.windspeed_10m}
                units={units} />
        ))
        return (
            <ListWrapper
                key={days[index]}
                title={days[index].replaceAll("_", "-")}
            >
                {listElements}
            </ListWrapper>
        )
    }) : []

    return hourlyDataList;
}

export default WeatherHourly;