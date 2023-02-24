import React from 'react'
import bemCssModules from 'bem-css-modules'
import { default as temperaturedisplayStyles } from './TemperatureDisplay.module.scss'

const style = bemCssModules(temperaturedisplayStyles)

const TemperatureDisplay = ({
    value = 0,
    unit = "C",
    isApparent = false
}) => {
    const text = isApparent ? "apparent: " : ""

    return (
        <div className={style()}>
            <p
                aria-label={isApparent ? 'apparent' : 'notApparent'}
                className={style('text')}
            >
                {text} <span className={style('value')}>{`${value}${unit}`}</span>
            </p>
        </div>
    );
}

export default TemperatureDisplay;