import React, {FC} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {UserApi} from "../../shared/api/userApi";

interface LogOutProps {
    children: any
}

const LogOut: FC<LogOutProps> = ({children}) => {
    const navigate = useNavigate()
    const logoutHandle = async () => {
        const data = await UserApi.logout()
        navigate("/login")
    }

    return (
        <Link to={'/logout'} onClick={logoutHandle}>
            {children}
        </Link>
    );
};

export default LogOut;