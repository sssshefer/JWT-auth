import React, {useContext, useEffect, useState} from 'react';
import cl from './Account.module.css'
import UserIcon from "../../shared/ui/icons/UserIcon";
import {accentColor} from "../../shared/ui/styles/styles";
import {UserContext} from "../../shared/store/UserContext";
import AutoSavedUserInput from "../../entities/AutoSavedUserInput/AutoSavedUserInput";
import {UserApi} from "../../shared/api/userApi";


const Account = () => {
    const {user, setUser} = useContext(UserContext)
    useEffect(() => {
        console.log(user)
    },[])
    return (
        <div className={cl.wrap}>
            {/*{<UserDetails user={user}/>}*/}
            <table className={cl.userProps}>
                <caption>
                    <div className={cl.userIconWrap}>
                        <UserIcon color={accentColor}/>
                    </div>
                    <h1 className={cl.title}>
                        Account page
                    </h1>
                </caption>
                <tbody>
                <tr>
                    <th>Email:</th>
                    <td>{user?.email}</td>
                </tr>
                <tr>
                    <th>Email confirmation:</th>
                    <td>{user?.isActivated?'Confirmed':'Not confirmed'}</td>
                </tr>
                <tr>
                    <th>First name:</th>
                    <td><AutoSavedUserInput userPropertyName={'firstName'} apiMethod={UserApi.updateFirstName} /></td>
                </tr>
                <tr>
                    <th>Last name:</th>
                    <td><AutoSavedUserInput userPropertyName={'lastName'} apiMethod={UserApi.updateLastName} /></td>
                </tr>
                <tr>
                    <th>Subscription status:</th>
                    <td>{user?.subscriptionStatus}</td>
                </tr>
                <tr>
                    <th>Registration date:</th>
                    <td>{ user?.registrationDate && new Date(user.registrationDate).toLocaleString()}</td>
                </tr>
                <tr>
                    <th>Last visit date:</th>
                    <td>{user?.lastVisitDate && new Date(user.lastVisitDate).toLocaleString()}</td>
                </tr>
                <tr>
                    <th>Total visits:</th>
                    <td>{user?.totalVisits}</td>
                </tr>
                <tr>
                    <th>Timezone offset:</th>
                    <td>{user?.timezoneOffset}</td>
                </tr>
                <tr>
                    <th>Current strike:</th>
                    <td>{user?.strike}</td>
                </tr>
                </tbody>
            </table>

        </div>
    );
};

export default Account;