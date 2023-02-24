import React, { useState } from 'react'

import arrow from './assets/arrow.png'
import bemCssModules from 'bem-css-modules'
import { default as listwrapperStyles } from './ListWrapper.module.scss'

const style = bemCssModules(listwrapperStyles)

const ListWrapper = ({ children, title }) => {

    const [showList, setshowList] = useState(true)
    const toggleList = () => setshowList(!showList);

    return (
        <div className={style()}>
            <div className={style('titleBar')} onClick={toggleList}>
                <div className={style('date')}>
                    <p>{title}</p>
                </div>
                <div className={style('arrowWrapper')}>
                    <img
                        src={arrow}
                        alt="expand"
                    />
                </div>
            </div>
            <div
                className={style('tempList')}
                aria-hidden={showList}
            >
                {children}
            </div>
        </div>
    );
}

export default ListWrapper;