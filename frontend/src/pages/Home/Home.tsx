import React from 'react';
import cl from './Home.module.css'
import {accentColor} from "../../shared/styles/styles";

const Home = () => {
    return (
        <div className={cl.wrap}>
            <p>
                This application shows the benefits of using <b>Json Web Tokens (JWT)</b> for authentication.
                Try to sign up, log in, reload the pages and see how the application behaves.
                The application is built with React, TypeScript, Express, Node.js, MongoDB.
                Main features include authentication, protected routes, and persistent login.
            </p>

            <h3>Test user credentials:</h3>
            <p>
                Email: <b style={{color: accentColor}}>test@test.com</b>
                <br/>
                Password: <b style={{color: accentColor}}>12345678</b>
                <br/><br/>
                If you sign up with real credentials, the application will send you a confirmation email. You can use
                any imaginary email address in case you check "Turn off email confirmation" checkbox.
            </p>
            <h3>Password recovery</h3>
            <p>If you have access to the provided email address, you can recover the password. A new password will be
                sent
                to your email.</p>
            <h3>Changing password</h3>
            <p> After log in to your account you can change the password on "Account" page in the bottom. You will be
                log out from all devices afterwards</p>
            <h3>Auto saved inputs</h3>
            <p> On "Account" page you can change your first and last name. Debounced input will save your text after
                short delay</p>
        </div>
    );
};

export default Home;