import React from 'react';
import cl from './Loader.module.css'
import loaderImg from "../../assets/transparentWripetWithWhiteBackground.png";

const Loader = () => {
    return (
        <div className={cl.wrap}>
            <div className={cl.text}>
                <img className={cl.img} src={loaderImg} alt="Loader"/>
            </div>
        </div>
    );
};

export default Loader;