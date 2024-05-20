import React, {FC} from 'react';
import {UserApi} from "../../shared/api/userApi";
import {IResponse} from "../../shared/types/IResponse";
import {unexpectedErrorResponse} from "../../shared/consts/errors";

interface RecoverPasswordButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    email: string,
    setRecoverPopupIsVisible: React.Dispatch<boolean>,
    setRecoverPasswordResponse: React.Dispatch<IResponse | undefined>
}

const RecoverPasswordButton: FC<RecoverPasswordButtonProps> = ({
                                                                   email,
                                                                   setRecoverPopupIsVisible,
                                                                   setRecoverPasswordResponse,
                                                                   children,
                                                                   ...props
                                                               }) => {

    const handleSendNewPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            e.preventDefault()
            const response = await UserApi.sendNewPassword(email)
            setRecoverPasswordResponse(response)
        } catch (err) {
            setRecoverPasswordResponse(unexpectedErrorResponse)
        } finally {
            setRecoverPopupIsVisible(true)
        }
    }

    return (
        <button onClick={(e) => handleSendNewPassword(e)} {...props}>
            {children}
        </button>);
};

export default RecoverPasswordButton;