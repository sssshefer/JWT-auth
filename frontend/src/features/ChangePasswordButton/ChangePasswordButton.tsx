import React, {FC, useContext, useEffect, useState} from 'react';
import {UserApi} from "../../shared/api/userApi";
import {useNavigate} from "react-router-dom";
import cl from './ChangePassword.module.css';
import {IResponse} from "../../shared/types/IResponse";
import {UserContext} from "../../shared/store/UserContext";

interface ChangePasswordButtonProps {
    setShowSaved: React.Dispatch<React.SetStateAction<boolean>>,
    oldPassword: string,
    newPassword: string,
    setResponse: React.Dispatch<IResponse | undefined>,
    className?: string,
    children: any
}

const ChangePasswordButton: FC<ChangePasswordButtonProps> = ({
                                                                 setShowSaved,
                                                                 oldPassword,
                                                                 newPassword,
                                                                 setResponse,
                                                                 className,
                                                                 children
                                                             }) => {
    const navigate = useNavigate();

    const {user, setUser} = useContext(UserContext)


    const handleChangePassword = async () => {
        try {
            const response = await UserApi.changePassword(oldPassword, newPassword)
            setResponse(response)
            setShowSaved(true)
            setTimeout(() => {
                setShowSaved(false)
                setUser(undefined)
                navigate("/login")

            }, 1500)

        } catch (err: any) {
            setResponse(err.response.data)
        }
    }

    return (
        <button onClick={handleChangePassword} className={className}>
            {children}
        </button>
    );
};

export default ChangePasswordButton;