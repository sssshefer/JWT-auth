import React from 'react';
import cl from './NotFound.module.css'

const NotFound = () => {
    return (
        <div className={cl.wrap}>
            <div className={cl.smile}>
                =(
            </div>
            <h1 className={cl.title}>
                Oops! The page you are looking for is not found
            </h1>
            <p className={cl.subtitle}>
                Make sure you entered correct url
            </p>
        </div>
    );
};

export default NotFound;