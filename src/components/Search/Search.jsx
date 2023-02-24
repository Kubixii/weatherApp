import React, { useContext, useEffect, useState } from 'react'

import SearchOption from '../SearchOption/SearchOption'
import { StoreContext } from '../../store/StoreProvider'
import arrow from './assets/arrow.png'
import bemCssModules from 'bem-css-modules'
import { default as citysearchStyles } from './Search.module.scss'
import { geocodeRequest } from '../../helpers/requests'
import { useLocation } from 'react-router'

const style = bemCssModules(citysearchStyles)

const Search = () => {
    const { updateParams } = useContext(StoreContext)
    const location = useLocation()

    const [citySearch, setCitySearch] = useState('')
    const [citySearchList, setCitySearchList] = useState([])
    const [cityListVisible, setCityListVisible] = useState(false)
    const toggleCityList = () => setCityListVisible(!cityListVisible)

    const handleCitySearch = (e) => {

        setCityListVisible(true)
        setCitySearch(e.target.value)
    }

    const updateList = async () => {
        await geocodeRequest.get(`search?name=${citySearch}`)
            .then(res => {
                if (res.data.hasOwnProperty('results')) {
                    setCitySearchList(res.data.results)
                }
                else setCitySearchList([])
            })
    }
    useEffect(() => {
        updateList()
    }, [citySearch])

    const options = citySearchList.map(city => {
        return <SearchOption
            key={city.id}
            name={city.name}
            country={city.country}
            url={`/${city.latitude}/${city.longitude}/${location.pathname.split("/")[3]}`}
            onclick={() => {
                setCitySearch(city.name)
                setCityListVisible(false)
                updateParams(city, city.latitude, city.longitude, 'hourly')
            }}
        />
    })
    return (
        <div className={style()}>
            <div className={style('input')}>
                <input
                    type="text"
                    onChange={handleCitySearch}
                    value={citySearch}
                />
                <div
                    onClick={citySearch !== '' ? toggleCityList : null}
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

export default Search;