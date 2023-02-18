import { Outlet, Route, Routes } from 'react-router';

import CitySearch from '../CitySearch/CitySearch';
import React from 'react'

const Main = () => {
    return (
        <>
            <CitySearch />
            <Outlet />
        </>
    );
}

export default Main;