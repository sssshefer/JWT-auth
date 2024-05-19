import React, {useEffect, useState} from 'react';
import cl from "../Signup/Signup.module.css";
import {Link} from "react-router-dom";
import FilteredFormErrors from "../../entities/FilteredFormErrors/FilteredFormErrors";
import EmailConfirmPopup from "../../widgets/EmailConfirmPopup/EmailConfirmPopup";
import PasswordInput from "../../entities/PasswordInput/PasswordInput";
import {IResponse} from "../../shared/types/IResponse";
import SignupButton from "../../features/SignupButton/SignupButton";
import CustomCheckbox from "../../shared/ui/CustomCheckbox/CustomCheckbox";


const Signup = () => {
    const [popupIsVisible, setPopupIsVisible] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState('');
    const [checkEmail, setCheckEmail] = useState<boolean>(true)
    const [response, setResponse] = useState<IResponse | undefined>(undefined);

    useEffect(() => {
        setPopupIsVisible(response?.success || false)
    }, [response?.success])

    return (
        <div className={cl.wrap}>
            {popupIsVisible &&
                <EmailConfirmPopup email={email} password={password} setPopupIsVisible={setPopupIsVisible}/>}
            <form action="" className={cl.form}>
                <h1 className={cl.title}>
                    Get started for free
                </h1>
                <div className={cl.inputsWrap}>
                    <input type="text" placeholder='Email' value={email} onChange={e => setEmail((e.target.value))}/>
                    <FilteredFormErrors errors={response?.errors} type="email"/>
                    <PasswordInput setPassword={setPassword} errors={response?.errors}/>
                </div>
                <div className={cl.emailCheckboxWrap}>
                    <CustomCheckbox name={'emailConfirmation'} labelText={'Turn off email confirmation for testing purpose'} setCheckbox={setCheckEmail}/>
                </div>
                <h6 className={cl.licenseAgreement}>By signing up, you agree to our <Link
                    to={'/terms-of-use'} target="_blank">Terms of Use</Link> and <Link
                    to={'/privacy-policy'} target="_blank">Privacy Policy</Link></h6>
                <p className="error">
                    {response?.message}
                </p>
                <div className={cl.registrationButtonWrap}>
                    <SignupButton email={email} password={password} setResponse={setResponse}
                                  className={"customButton"} checkEmail={checkEmail}>Sign up</SignupButton>
                </div>
                <p className={cl.loginLinkWrap}>
                    Already have an account? <Link to={'/login'} className={cl.loginLink}>Log in</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;