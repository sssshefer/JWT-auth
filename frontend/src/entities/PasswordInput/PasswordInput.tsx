import React, {FC, useState} from 'react';
import cl from './PasswordInput.module.css'
import FilteredFormError from "../FilteredFormErrors/FilteredFormError";
import PasswordEyeIcon from "../../shared/ui/icons/PasswordEyeIcon";
import {accentColor, darkPrimaryColor} from "../../shared/styles/styles";
import {IFormError} from "../../shared/types/IFormError";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    setPassword: React.Dispatch<string>,
    placeholder?: string,
}

const PasswordInput: FC<PasswordInputProps> = ({setPassword, placeholder = "Password", ...props}) => {
    const [showPassword, setShowPassword] = useState(false)

    function handleEyeClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setShowPassword(!showPassword)
    }

    return (
        <div className={cl.wrap}>
            <input name="password" type={showPassword ? "text" : "password"} placeholder={placeholder}
                   onChange={e => setPassword((e.target.value))} {...props}/>
            <button className={cl.eyeButton} tabIndex={-1} onClick={(e) => handleEyeClick(e)}>
                <PasswordEyeIcon color={showPassword ? accentColor : darkPrimaryColor}/>
            </button>
        </div>
    );
};

export default PasswordInput;