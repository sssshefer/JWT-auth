import React, {useContext, useState} from 'react';
import cl from './Account.module.css'
import UserIcon from "../../shared/ui/icons/UserIcon";
import {accentColor} from "../../shared/styles/styles";
import {UserContext} from "../../shared/store/UserContext";
import AutoSavedTextInput from "../../features/AutoSavedTextInput/AutoSavedTextInput";
import {UserApi} from "../../shared/api/userApi";
import CustomButton from "../../shared/ui/CustomButton/CustomButton";
import ChangePasswordPopup from "../../widgets/ChangePasswordPopup/ChangePasswordPopup";
import {IUser} from "../../shared/types/IUser";


const Account = () => {
    const {user, setUser} = useContext(UserContext)
    const [changePasswordPopupIsVisible, setChangePasswordPopupIsVisible] = useState<boolean>(false)

    return (
        <div className={cl.wrap}>
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
                    <td>{user?.isActivated ? 'Confirmed' : 'Not confirmed'}</td>
                </tr>
                <tr>
                    <th>First name:</th>
                    <td><AutoSavedTextInput inputName={'firstName'}
                                            apiMethod={UserApi.updateFirstName}
                                            successCallback={(user: IUser | undefined) => setUser(user)}
                                            defaultValue={user?.firstName}/></td>
                </tr>
                <tr>
                    <th>Last name:</th>
                    <td><AutoSavedTextInput inputName={'lastName'}
                                            apiMethod={UserApi.updateLastName}
                                            successCallback={(user: IUser | undefined) => setUser(user)}
                                            defaultValue={user?.lastName}/></td>
                </tr>
                <tr>
                    <th>Subscription status:</th>
                    <td>{user?.subscriptionStatus}</td>
                </tr>
                <tr>
                    <th>Registration date:</th>
                    <td>{user?.registrationDate && new Date(user.registrationDate).toLocaleString()}</td>
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

            <CustomButton onClick={() => setChangePasswordPopupIsVisible(true)}>
                Change password
            </CustomButton>
            {changePasswordPopupIsVisible &&
                <ChangePasswordPopup setPopupIsVisible={setChangePasswordPopupIsVisible}/>}
        </div>
    );
};

export default Account;