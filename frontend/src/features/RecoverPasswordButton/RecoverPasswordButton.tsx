// import React, {FC} from 'react';
// import {UserApi} from "../../shared/api/userApi";
// import {IResponse} from "../../shared/types/IResponse";
//
// interface RecoverPasswordProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//     email: string,
//     setRecoverPopupIsVisible: React.Dispatch<boolean>,
// }
//
// const RecoverPassword: FC<RecoverPasswordProps> = ({email, setRecoverPopupIsVisible, children, ...props}) => {
//
//     const [errorMessage, setErrorMessage] = React.useState<string|null>(null)
//
//     const handleSendNewPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
//         try {
//             e.preventDefault()
//             const response = await UserApi.sendNewPassword(email)
//             if (response.success) {
//                 setErrorMessage(null)
//             } else {
//                 setErrorMessage(response.message)
//             }
//         } catch (e) {
//             setErrorMessage('Unexpected error occurred. Please try again later.')
//             console.log(123)
//         } finally {
//             setRecoverPopupIsVisible(true)
//         }
//     }
//
//     return (
//         <button onClick={(e) => handleSendNewPassword(e)} {...props}>
//             {errorMessage ? errorMessage : children}
//         </button>);
// };
//
// export default RecoverPassword;

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
        } catch (e) {
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