import axios from 'axios'

export const weatherRequest = axios.create({
    baseURL: "https://api.open-meteo.com/v1/"
})

export const geocodeRequest = axios.create({
    baseURL: "https://geocoding-api.open-meteo.com/v1"
})