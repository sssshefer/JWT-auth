import React, {useEffect, useState} from 'react';
import './App.css';
import Loader from "../shared/ui/Loader/Loader";
import {UserApi} from "../shared/api/userApi";

function App() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        userInit()

        async function userInit() {
            try {
                const user = await UserApi.getUser();

                setLoading(false)
            } catch (e) {
                setLoading(false)
            }
        }
    }, [])

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="App">
            Hello World
        </div>
    );
}

export default App;
