import React from 'react';
import cl from './Home.module.css'

const Home = () => {
    return (
        <div className={cl.wrap}>
            <p>
                This application shows the benefits of using <b>Json Web Tokens (JWT)</b> for authentication.
                Try to sign up, log in, reload the pages and see how the application behaves.
                The application is built with React, TypeScript, Express, Node.js, MongoDB.
                Main features include authentication, protected routes, and persistent login.
            </p>
        </div>

    );
};

export default Home;