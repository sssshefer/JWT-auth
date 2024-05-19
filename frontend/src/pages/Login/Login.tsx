import React, {useContext, useEffect, useState} from 'react';
import cl from './Login.module.css'
import {Link, useNavigate} from "react-router-dom";
import FilteredFormErrors from "../../entities/FilteredFormErrors/FilteredFormErrors";
import RecoverPasswordButton from "../../features/RecoverPasswordButton/RecoverPasswordButton";
import PasswordInput from "../../entities/PasswordInput/PasswordInput";
import EmailConfirmPopup from "../../widgets/EmailConfirmPopup/EmailConfirmPopup";
import LoginButton from "../../features/LoginButton/LoginButton";
import RecoverPopup from "../../widgets/PasswordRecoverPopup/PasswordRecoverPopup";
import {IResponse} from "../../shared/types/IResponse";
import CustomButton from "../../shared/ui/CustomButton/CustomButton";
import {UserContext} from "../../shared/store/UserContext";


const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {user, setUser} = useContext(UserContext)

    const navigate = useNavigate();

    const [confirmPopupIsVisible, setConfirmPopupIsVisible] = useState<boolean>(false)
    const [recoverPopupIsVisible, setRecoverPopupIsVisible] = useState<boolean>(false)

    const [recoverPasswordResponse, setRecoverPasswordResponse] = useState<IResponse | undefined>(undefined)
    const [loginResponse, setLoginResponse] = useState<IResponse | undefined>(undefined)

    useEffect(() => {
        console.log(loginResponse)
        setConfirmPopupIsVisible(loginResponse?.errors?.some(error => error.path === 'emailActivation') || false)
        if (loginResponse?.success) {
            setUser(loginResponse.data.userDetails)
            navigate('/account')
        }
    }, [loginResponse?.success])
    return (

        <div className={cl.wrap + " flexCenter"}>
            {confirmPopupIsVisible &&
                <EmailConfirmPopup email={email} password={password} setPopupIsVisible={setConfirmPopupIsVisible}/>}
            {recoverPopupIsVisible &&
                <RecoverPopup setPopupIsVisible={setRecoverPopupIsVisible}
                              recoverPasswordResponse={recoverPasswordResponse}/>}

            <form className={cl.form} autoComplete='on'>
                <h1 className={cl.title}>
                    Log in
                </h1>
                <div className={cl.inputsWrap}>
                    <input name="email" id="email" type="email" placeholder='Email or username'
                           onChange={e => setEmail((e.target.value))}/>
                    <FilteredFormErrors errors={loginResponse?.errors} type="email"/>
                    <PasswordInput setPassword={setPassword} errors={loginResponse?.errors}/>
                </div>
                <p className="error">
                    {/*loginResponse?.message}*/}
                </p>
                <div className={cl.submitButtonWrap}>
                    <LoginButton email={email} password={password} setResponse={setLoginResponse}
                                 className={"customButton"}>
                        Log in
                    </LoginButton>
                </div>

                <div className={cl.sendNewPasswordButtonWrap}>
                    <RecoverPasswordButton email={email} setRecoverPasswordResponse={setRecoverPasswordResponse}
                                           setRecoverPopupIsVisible={setRecoverPopupIsVisible}
                                           className={"customButton"}>
                        Recover password
                    </RecoverPasswordButton>
                </div>
                <p className={cl.signupLinkWrap}>
                    Not a member yet? <Link to={'/signup'} className={cl.signupLink}>Sign up for free</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;