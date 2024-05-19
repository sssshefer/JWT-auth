import React, {FC, useContext, useEffect, useLayoutEffect, useState} from 'react';
import cl from './EmailConfirmPopup.module.css'
import CustomButton from "../../shared/ui/CustomButton/CustomButton";
import {UserApi} from "../../shared/api/userApi";
import {useNavigate} from "react-router-dom";
import Timer from "../../entities/Timer/Timer";
import EmailIcon from "../../shared/ui/icons/EmailIcon";
import LoginButton from "../../features/LoginButton/LoginButton";
import {IResponse} from "../../shared/types/IResponse";
import {accentColor} from "../../shared/ui/styles/styles";
import {UserContext} from "../../shared/store/UserContext";

interface EmailConfirmPopupProps {
    email: string,
    password: string,
    setPopupIsVisible: React.Dispatch<React.SetStateAction<boolean>>

}

const EmailConfirmPopup: FC<EmailConfirmPopupProps> = ({email, password, setPopupIsVisible}) => {

    const navigate = useNavigate();
    const [showFailedLoginIcon, setShowFailedLoginIcon] = useState<boolean>(false)
    const [response, setResponse] = useState<IResponse | undefined>(undefined)
    const {user, setUser} = useContext(UserContext)

    useLayoutEffect(() => {
        if (response?.success) {
            setStartTimer(false)
            setUser(response.data.userDetails)
            navigate('/account')
        }
        if (response && !response.success)
            if (!showFailedLoginIcon) {
                setShowFailedLoginIcon(true)
                timeout = setTimeout(() => setShowFailedLoginIcon(false), 800)
            }
    }, [response])

    let timeout;

    const [startTimer, setStartTimer] = useState(true)

    const handleResend = async () => {
        try {
            await UserApi.resendActivationLink(email, password)
            setStartTimer(true)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={cl.wrap} onClick={() => setPopupIsVisible(false)}>
            <div className={cl.popupWrap} onClick={(e) => e.stopPropagation()}>
                <button className={cl.exitButton} onClick={() => setPopupIsVisible(false)}>x</button>
                <div className={cl.titleWrap}>
                    <h3 className={cl.title}>Verify your account </h3>
                    <span className={cl.emailIcon}><EmailIcon color={accentColor}/></span>
                </div>
                <h6 className={cl.text}>Activation link has been sent to your email address </h6>
                <div className={cl.buttonsWrap}>
                    <div className={cl.loginButtonWrap}>
                        <LoginButton email={email} password={password}
                                     setResponse={setResponse} className={'customButton'}>
                            Log in
                        </LoginButton>
                        <span className={cl.failedLoginIcon}>{showFailedLoginIcon && <h6>not verified</h6>}</span>

                    </div>
                    <div className={cl.resendButtonWrap}>
                        <span className={cl.timerWrap}>
                            {startTimer && <Timer setStart={setStartTimer} start={startTimer} secondsNumber={60}/>}
                        </span>
                        <CustomButton disabled={startTimer} className={`accentOutline ${startTimer ? 'disabled' : ''}`}
                                      onClick={(e) => {
                                          !startTimer && handleResend()
                                      }}
                                      type='button'>Resend</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default EmailConfirmPopup;