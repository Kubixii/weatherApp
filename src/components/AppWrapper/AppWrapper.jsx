import App from '../App/App';
import React from 'react'
import { default as appwrapperStyles } from './AppWrapper.module.scss'
import bemCssModules from 'bem-css-modules'

const style = bemCssModules(appwrapperStyles)

const AppWrapper = () => {
    return (
        <div className={style()}>
            <div className={style('wrapper')}>
                <App />
            </div>
        </div>
    );
}

export default AppWrapper;