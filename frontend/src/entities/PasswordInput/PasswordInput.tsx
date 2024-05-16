import React, {FC, useState} from 'react';
import cl from './PasswordInput.module.css'
import FilteredFormErrors from "../FilteredFormErrors/FilteredFormErrors";
import PasswordEyeIcon from "../../shared/ui/icons/PasswordEyeIcon";
import {accentColor, darkPrimaryColor} from "../../shared/ui/styles/styles";
import {IFormError} from "../../shared/types/IFormError";

interface PasswordInputProps {
    setPassword: React.Dispatch<string>,
    errors: IFormError[]|undefined,
    placeholder?: string,
    errorsType?: string

}

const PasswordInput:FC<PasswordInputProps> = ({setPassword, errors, placeholder = "Password", errorsType = "password"}) => {
    const [showPassword, setShowPassword] = useState(false)
    function handleEyeClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setShowPassword(!showPassword)
    }
    return (
        <div className={cl.wrap}>
            <div className={cl.inputWrap}>
                <input name="password" type={showPassword ? "text" : "password"} placeholder={placeholder}
                       onChange={e => setPassword((e.target.value))}/>
                <button className={cl.eyeButton} tabIndex={-1} onClick={(e) => handleEyeClick(e)}>
                    <PasswordEyeIcon color={showPassword ? accentColor : darkPrimaryColor}/>
                </button>
            </div>
            <FilteredFormErrors errors={errors} type={errorsType}/>
        </div>
    );
};

export default PasswordInput;