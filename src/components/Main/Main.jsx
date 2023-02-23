import { Outlet, useParams } from 'react-router';

import { Link } from 'react-router-dom';
import React from 'react'
import Search from '../Search/Search';
import bemCssModules from 'bem-css-modules'
import { default as mainStyles } from './Main.module.scss'

const style = bemCssModules(mainStyles)

const Main = () => {
    const { lat, lon } = useParams()
    const baseURL = `/${lat}/${lon}`
    return (
        <div className={style()}>
            <Search />
            <div className={style('tabs')}>
                <Link to={`${baseURL}/hourly`}>Godzinowo</Link>
                <Link to={`${baseURL}/week`}>Tydzień</Link>
            </div>
            <div className={style('outletWrapper')}>
                <Outlet />
            </div>
        </div>
    );
}

export default Main;