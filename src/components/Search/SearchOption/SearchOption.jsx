import { Link } from 'react-router-dom';
import React from 'react'
import bemCssModules from 'bem-css-modules'
import { default as searchoptionStyles } from './SearchOption.module.scss'

const style = bemCssModules(searchoptionStyles)

const SearchOption = ({
    url = '',
    onclick = null,
    name = '',
    country = ''
}) => {
    return (
        <Link
            className={style()}
            to={url}
            onClick={onclick}
        >
            <p className={style('cityName')}>{name}</p>
            <p className={style('countryName')}>{country}</p>
        </Link>
    );
}

export default SearchOption;