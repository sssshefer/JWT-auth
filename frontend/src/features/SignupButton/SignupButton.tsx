import React, {FC} from 'react';
import cl from './SignupButton.module.css'
import {UserApi} from "../../shared/api/userApi";
import {unexpectedErrorResponse} from "../../shared/consts/errors";

interface SignupButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    setResponse: React.Dispatch<any>,
    email: string,
    password: string,
    checkEmail: boolean
}

const SignupButton: FC<SignupButtonProps> = ({setResponse, email, password, checkEmail, children, ...props}) => {
    const handleSignupSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const response = await UserApi.signup(email, password, checkEmail)
            setResponse(response)
        } catch (err:any){
            setResponse(err.response.data)
            console.log(err)
        }

    }
    return (
        <button onClick={(e) => handleSignupSubmit(e)} type="submit" {...props}>{children}</button>

    );
};

export default SignupButton;