import React, { useContext, useState } from 'react'

import { StoreContext } from '../../store/StoreProvider'
import arrow from './assets/arrow.png'
import bemCssModules from 'bem-css-modules'
import { default as citysearchStyles } from './CitySearch.module.scss'
import { geocodeRequest } from '../../helpers/requests'

const style = bemCssModules(citysearchStyles)

const CitySearch = () => {

    const { getWeatherData } = useContext(StoreContext)

    const [citySearchList, setCitySearchList] = useState([])
    const [cityListVisible, setCityListVisible] = useState(false)
    const toggleCityList = () => setCityListVisible(!cityListVisible)

    const updateCityList = async (e) => {

        await geocodeRequest.get(`search?name=${e.target.value}`)
            .then(res => {
                setCityListVisible(true)
                if (res.data.hasOwnProperty('results')) {
                    setCitySearchList(res.data.results)
                }
                else setCitySearchList([])
            })
    }

    const options = citySearchList.map(city => {
        return (
            <div
                key={city.id}
                className={style('cityOption')}
                value={city.id}
                onClick={() => {
                    setCityListVisible(false)
                    getWeatherData(city.latitude, city.longitude)
                }}
            >
                <p>{city.name}</p>
                <p>{city.country}</p>
            </div>
        )
    })
    return (
        <div className={style()}>
            <div className={style('input')}>
                <input
                    type="text"
                    onChange={updateCityList}
                />
                <div
                    onClick={toggleCityList}
                    className={style('toggleListbutton')}
                >
                    <img src={arrow} alt="Lista" />
                </div>
            </div>
            {cityListVisible && (
                <div className={style('citiesList')}>
                    {options}
                </div>
            )}
        </div>
    );
}

export default CitySearch;