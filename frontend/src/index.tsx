import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import UserProvider from "./shared/store/UserContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <UserProvider>
        <App/>
    </UserProvider>
);
