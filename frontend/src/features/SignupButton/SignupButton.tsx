import React, {FC, useEffect} from 'react';
import {UserApi} from "../../shared/api/userApi";

interface SignupButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    setResponse: React.Dispatch<any>,
    email: string,
    password: string,
    skipEmailVerification: boolean
}

const SignupButton: FC<SignupButtonProps> = ({setResponse, email, password, skipEmailVerification, children, ...props}) => {
    const handleSignupSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            console.log(email, skipEmailVerification)
            const response = await UserApi.signup(email, password, !skipEmailVerification)
            setResponse(response)
        } catch (err:any){
            setResponse(err.response.data)
            console.log(err)
        }
    }

    useEffect(()=>{
        console.log(skipEmailVerification)
    }, [skipEmailVerification])
    return (
        <button onClick={(e) => handleSignupSubmit(e)} type="submit" {...props}>{children}</button>
    );
};

export default SignupButton;