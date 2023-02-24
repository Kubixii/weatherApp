import { Outlet, useParams } from 'react-router';

import { NavLink } from 'react-router-dom';
import React from 'react'
import Search from '../Search/Search';
import TodaysWeather from '../TodaysWeather/TodaysWeather';
import bemCssModules from 'bem-css-modules'
import { default as mainStyles } from './Main.module.scss'

const style = bemCssModules(mainStyles)

const Main = () => {
    const { lat, lon } = useParams()
    const baseURL = `/${lat}/${lon}`

    const isActive = ({ isActive }) => isActive ? style('active') : style('inactive')

    return (
        <div className={style()}>
            <Search />
            <TodaysWeather />
            <div className={style('tabs')}>
                <NavLink
                    className={isActive}
                    to={`${baseURL}/hourly`}
                >
                    Hourly
                </NavLink>
                <NavLink
                    className={isActive}
                    to={`${baseURL}/week`}
                >
                    Week
                </NavLink>
            </div>
            <div className={style('outletWrapper')}>
                <Outlet />
            </div>
        </div>
    );
}

export default Main;