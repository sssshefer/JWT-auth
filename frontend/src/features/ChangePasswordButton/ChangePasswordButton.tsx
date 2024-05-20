import React, {ButtonHTMLAttributes, FC, useContext} from 'react';
import {UserApi} from "../../shared/api/userApi";
import {useNavigate} from "react-router-dom";
import {IResponse} from "../../shared/types/IResponse";
import {UserContext} from "../../shared/store/UserContext";

interface ChangePasswordButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    setShowSaved: React.Dispatch<React.SetStateAction<boolean>>,
    oldPassword: string,
    newPassword: string,
    setResponse: React.Dispatch<IResponse | undefined>,
}

const ChangePasswordButton: FC<ChangePasswordButtonProps> = ({
                                                                 setShowSaved,
                                                                 oldPassword,
                                                                 newPassword,
                                                                 setResponse,
                                                                 children,
                                                                 ...props
                                                             }) => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext)

    const handleChangePassword = async () => {
        try {
            const response = await UserApi.changePassword(oldPassword, newPassword)
            setResponse(response)
            setShowSaved(true)
            setTimeout(() => {
                setUser(undefined)
                navigate("/login")
                setShowSaved(false)
            }, 1500)
        } catch (err: any) {
            setResponse(err.response.data)
        }
    }

    return (
        <button onClick={handleChangePassword} {...props}>
            {children}
        </button>
    );
};

export default ChangePasswordButton;