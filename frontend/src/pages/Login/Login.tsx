import React, {useContext, useEffect, useState} from 'react';
import cl from './Login.module.css'
import {Link, useNavigate} from "react-router-dom";
import FilteredFormError from "../../entities/FilteredFormErrors/FilteredFormError";
import RecoverPasswordButton from "../../features/RecoverPasswordButton/RecoverPasswordButton";
import PasswordInput from "../../entities/PasswordInput/PasswordInput";
import EmailConfirmPopup from "../../widgets/EmailConfirmPopup/EmailConfirmPopup";
import LoginButton from "../../features/LoginButton/LoginButton";
import RecoverPopup from "../../widgets/PasswordRecoverPopup/PasswordRecoverPopup";
import {IResponse} from "../../shared/types/IResponse";
import {UserContext} from "../../shared/store/UserContext";
import {UserApi} from "../../shared/api/userApi";


const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {user, setUser} = useContext(UserContext)

    const [recoverButtonIsVisible, setRecoverButtonIsVisible] = useState<boolean>(false)
    const [recoverPopupIsVisible, setRecoverPopupIsVisible] = useState<boolean>(false)
    const [confirmPopupIsVisible, setConfirmPopupIsVisible] = useState<boolean>(false)

    const [recoverPasswordResponse, setRecoverPasswordResponse] = useState<IResponse | undefined>(undefined)
    const [loginResponse, setLoginResponse] = useState<IResponse | undefined>(undefined)

    useEffect(() => {
        if(loginResponse?.errors?.some(error => error.path === 'emailActivation')){
            setConfirmPopupIsVisible(true)
            handleResend()
        }
        if (loginResponse?.success) {
            setUser(loginResponse.data.userDetails)
            navigate('/account')
        }
    }, [loginResponse])

    const handleResend = async () => {
        try {
            await UserApi.resendActivationLink(email, password)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className={cl.wrap}>
            <form className={cl.form}>
                <h1 className={cl.title}>
                    Log in
                </h1>
                <div className={cl.inputsWrap}>
                    <input name="email" type="email" placeholder='Email or username'
                           onChange={e => setEmail((e.target.value))} className="customInput"/>
                    <FilteredFormError errors={loginResponse?.errors} type="email"/>

                    <PasswordInput setPassword={setPassword} className="customInput"/>
                    <FilteredFormError errors={loginResponse?.errors} type='password'/>
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
                <div className={cl.sendNewPasswordWrap}>
                    <button className={cl.sendNewPasswordOpenText}
                            onClick={(e) => {
                                e.preventDefault();
                                setRecoverButtonIsVisible(!recoverButtonIsVisible)
                            }}>
                        I forgot my password
                    </button>
                    {recoverButtonIsVisible &&
                        <div className={cl.sendNewPasswordButtonWrap}>
                            <RecoverPasswordButton email={email} setRecoverPasswordResponse={setRecoverPasswordResponse}
                                                   setRecoverPopupIsVisible={setRecoverPopupIsVisible}
                                                   className={"customButton"}>
                                Send new to email
                            </RecoverPasswordButton>
                        </div>}
                </div>
                <p className={cl.signupLinkWrap}>
                    Not a member yet? <Link to={'/signup'} className={cl.signupLink}>Sign up for free</Link>
                </p>
            </form>
            {confirmPopupIsVisible &&
                <EmailConfirmPopup email={email} password={password} setPopupIsVisible={setConfirmPopupIsVisible}/>}
            {recoverPopupIsVisible &&
                <RecoverPopup setPopupIsVisible={setRecoverPopupIsVisible}
                              recoverPasswordResponse={recoverPasswordResponse}/>}
        </div>
    );
};

export default Login;