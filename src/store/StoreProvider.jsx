import React, { createContext, useEffect, useState } from 'react'
import { defaultParams, initData, initLocation } from '../helpers/defaults'

export const StoreContext = createContext(null)

const StoreProvider = ({ children }) => {

    const [currentParams, setCurrentParams] = useState(defaultParams)
    const [currentLocation, setCurrentLocation] = useState(initLocation)
    const [weatherData, setWeatherData] = useState(initData)

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