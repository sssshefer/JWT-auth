import React, {FC} from 'react';
import cl from "./PasswordRecoverPopup.module.css";
import EmailIcon from "../../shared/ui/icons/EmailIcon";
import {accentColor} from "../../shared/ui/styles/styles";
import {IResponse} from "../../shared/types/IResponse";

interface RecoverPopupProps {
    setPopupIsVisible: React.Dispatch<boolean>,
    recoverPasswordResponse: IResponse | undefined
}

const PasswordRecoverPopup: FC<RecoverPopupProps> = ({setPopupIsVisible, recoverPasswordResponse}) => {
    return (
        <div className={cl.wrap} onClick={() => setPopupIsVisible(false)}>
            <div className={cl.popupWrap} onClick={(e) => e.stopPropagation()}>
                <button className={cl.exitButton} onClick={() => setPopupIsVisible(false)}>x</button>
                <div className={cl.titleWrap}>

                    <h3 className={cl.title}>{recoverPasswordResponse?.success ? "Check Your Email" :
                        recoverPasswordResponse?.message}</h3>


                    <span className={cl.emailIcon}><EmailIcon color={accentColor}/></span>
                </div>

                <h6 className={cl.text}>  {recoverPasswordResponse?.success ? "We have sent you a new password on your email" : "Please, try again later"} </h6>
            </div>
        </div>
    );
};

export default PasswordRecoverPopup;