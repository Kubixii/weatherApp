import React, { createContext, useEffect, useState } from 'react'
import { defaultParams, initData } from '../helpers/defaults'

import { weatherRequest } from '../helpers/requests'

export const StoreContext = createContext(null)

const StoreProvider = ({ children }) => {

    const [currentParams, setCurrentParams] = useState(defaultParams)
    const [weatherData, setWeatherData] = useState(initData)

    const getWeatherData = async (lat, lon, type) => {

        //TODO docelowo paramsy z react router jak niżej
        // URL/lat/lon/typ_wyświetlania
        // typy wyświetlania w <Outlet/> jako osobne zakładki

        await weatherRequest.get(`forecast?latitude=${lat}&longitude=${lon}&${type}=temperature_2m`)
            .then(res => {
                setWeatherData(prev => { return { ...prev, [type]: res.data } })
            })
    }
    useEffect(() => {
        const { lat, lon, type } = currentParams
        getWeatherData(lat, lon, type)
    }, [currentParams.lat, currentParams.lon])

    const updateParams = (lat, lon, type) => setCurrentParams({ lat, lon, type })

    return (
        <StoreContext.Provider value={{
            currentParams,
            weatherData,
            getWeatherData,
            updateParams
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreProvider;