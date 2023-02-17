import React, { createContext, useEffect, useState } from 'react'

import { weatherRequest } from '../helpers/requests'

export const StoreContext = createContext(null)

const StoreProvider = ({ children }) => {

    const [currentLocation, setCurrentLocation] = useState({})
    const [weatherData, setWeatherData] = useState({})

    const getWeatherData = async (lat, lon) => {
        //TODO docelowo paramsy z react router jak niżej
        // URL/lat/lon/typ_wyświetlania
        // typty wyświetlania z <Outlet/> jako osobne zakładki
        await weatherRequest.get(`forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`)
            .then(res => {
                setCurrentLocation(res)
            })
    }

    useEffect(() => {
        getWeatherData(52.25, 21)
    }, [])

    return (
        <StoreContext.Provider value={{
            currentLocation,
            weatherData,
            getWeatherData
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreProvider;