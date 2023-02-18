import { Outlet, useParams } from 'react-router';

import CitySearch from '../CitySearch/CitySearch';
import { Link } from 'react-router-dom';
import React from 'react'
import bemCssModules from 'bem-css-modules'
import { default as mainStyles } from './Main.module.scss'

const style = bemCssModules(mainStyles)

const Main = () => {
    const { lat, lon } = useParams()
    const baseURL = `/${lat}/${lon}`
    return (
        <div className={style()}>
            <CitySearch />
            <div className={style('tabs')}>
                <Link to={`${baseURL}/hourly`}>Godzinowo</Link>
                <Link to={`${baseURL}/daily`}>Dziennie</Link>
            </div>
            <Outlet />
        </div>
    );
}

export default Main;