import React, { createContext, useEffect, useState } from 'react'
import { defaultParams, initData } from '../helpers/defaults'

export const StoreContext = createContext(null)

const StoreProvider = ({ children }) => {

    const [currentParams, setCurrentParams] = useState(defaultParams)
    const [currentLocation, setCurrentLocation] = useState({})
    const [weatherData, setWeatherData] = useState(initData)

    //TODO docelowo paramsy z react router jak niżej
    // URL/lat/lon/typ_wyświetlania
    // typy wyświetlania w <Outlet/> jako osobne zakładki
    // zrobić pobieranie danych o lokalizacji na podstawie paramsów

    const updateWeatherData = (data, type) => setWeatherData(prev => { return { ...prev, [type]: data } })
    const updateParams = (city, lat, lon, type) => {
        setCurrentLocation(city)
        setCurrentParams({ lat, lon, type })
    }

    return (
        <StoreContext.Provider value={{
            currentParams,
            weatherData,
            currentLocation,
            updateParams,
            updateWeatherData
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreProvider;