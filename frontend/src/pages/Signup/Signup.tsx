import React, {useEffect, useState} from 'react';
import cl from "../Signup/Signup.module.css";
import {Link} from "react-router-dom";
import FilteredFormError from "../../entities/FilteredFormErrors/FilteredFormError";
import EmailConfirmPopup from "../../widgets/EmailConfirmPopup/EmailConfirmPopup";
import PasswordInput from "../../entities/PasswordInput/PasswordInput";
import {IResponse} from "../../shared/types/IResponse";
import SignupButton from "../../features/SignupButton/SignupButton";
import CustomCheckbox from "../../shared/ui/CustomCheckbox/CustomCheckbox";


const Signup = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState('');
    const [skipEmailVerification, setSkipEmailVerification] = useState<boolean>(false)

    const [confirmPopupIsVisible, setConfirmPopupIsVisible] = useState<boolean>(false)
    const [signupResponse, setSignupResponse] = useState<IResponse | undefined>(undefined);

    useEffect(() => {
        setConfirmPopupIsVisible(signupResponse?.success || false)
    }, [signupResponse])

    return (
        <div className={cl.wrap}>
            <form action="" className={cl.form}>
                <h1 className={cl.title}>
                    Get started for free
                </h1>
                <div className={cl.inputsWrap}>
                    <input type="text" placeholder='Email' value={email} onChange={e => setEmail((e.target.value))}
                           className="customInput"/>
                    <FilteredFormError errors={signupResponse?.errors} type="email"/>
                    <PasswordInput setPassword={setPassword} className="customInput"/>
                    <FilteredFormError errors={signupResponse?.errors} type='password'/>
                </div>
                <div className={cl.emailCheckboxWrap}>
                    <CustomCheckbox name={'emailConfirmation'}
                                    labelText={'Turn off email confirmation for testing purpose'}
                                    setCheckbox={setSkipEmailVerification}/>
                </div>
                <h6 className={cl.licenseAgreement}>By signing up, you agree to our&nbsp;
                    <Link to={'/terms-of-use'} target="_blank">Terms of Use</Link>
                    &nbsp;and&nbsp;
                    <Link to={'/privacy-policy'} target="_blank">Privacy Policy</Link>
                </h6>
                <div className={cl.registrationButtonWrap}>
                    <SignupButton email={email} password={password} setResponse={setSignupResponse}
                                  className={"customButton"} skipEmailVerification={skipEmailVerification}>
                        Sign up
                    </SignupButton>
                </div>
                <p className={cl.loginLinkWrap}>
                    Already have an account? <Link to={'/login'} className={cl.loginLink}>Log in</Link>
                </p>
            </form>
            {confirmPopupIsVisible &&
                <EmailConfirmPopup email={email} password={password} setPopupIsVisible={setConfirmPopupIsVisible}/>}
        </div>
    );
};

export default Signup;