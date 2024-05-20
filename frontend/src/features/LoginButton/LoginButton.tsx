import React, {FC} from 'react';
import {UserApi} from "../../shared/api/userApi";
import {IResponse} from "../../shared/types/IResponse";

interface LoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    setResponse: React.Dispatch<IResponse|undefined>,
    email: string,
    password: string,
}

const LoginButton: FC<LoginButtonProps> = ({setResponse, email, password, children, ...props}) => {

    const handleLoginSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setResponse(undefined)
        try {
            const response = await UserApi.login(email, password)
            setResponse(response)
        }catch (err:any) {
            setResponse(err.response.data)
        }
    }

    return (
        <button onClick={(e) => handleLoginSubmit(e)} type="submit" {...props}>{children}</button>
    );
};

export default LoginButton;