import { Link } from 'react-router-dom';
import React from 'react'

const TestNav = () => {
    return (
        <div>
            <Link to='/jeden' >Jeden</Link>
            <Link to='/dwa' >Dwa</Link>
        </div>
    );
}

export default TestNav;