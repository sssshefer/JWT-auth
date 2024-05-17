import React, {FC, useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {UserApi} from "../../shared/api/userApi";
import {IResponse} from "../../shared/types/IResponse";
import {IUser} from "../../shared/types/IUser";
import {UserContext} from "../../shared/store/UserContext";

interface LogOutProps {
    children: any,
}

const LogOutButton: FC<LogOutProps> = ({children}) => {
    const {user, setUser} = useContext(UserContext)

    const navigate = useNavigate()
    const logoutHandle = async () => {
        const response = await UserApi.logout()
        if (response.success) {
            setUser(undefined)
            navigate("/login");
        } else
            console.log(response.message)
    }

    return (
        <button onClick={logoutHandle}>
            {children}
        </button>
    );
};

export default LogOutButton;