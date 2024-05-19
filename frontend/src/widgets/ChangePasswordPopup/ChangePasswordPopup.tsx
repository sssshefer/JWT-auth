import React, {FC, useState} from 'react';
import cl from './ChangePasswordPopup.module.css'
import KeyIcon from "../../shared/ui/icons/KeyIcon";
import ChangePasswordButton from "../../features/ChangePasswordButton/ChangePasswordButton";
import PasswordInput from "../../entities/PasswordInput/PasswordInput";
import SavedIcon from "../../shared/ui/icons/SavedIcon/SavedIcon";
import {accentColor} from "../../shared/ui/styles/styles";
import {IResponse} from "../../shared/types/IResponse";

interface ChangePasswordPopupProps {
    setPopupIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangePasswordPopup:FC<ChangePasswordPopupProps> = ({setPopupIsVisible}) => {
    const [response, setResponse] = useState<IResponse|undefined>(undefined)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [showSavedIcon, setShowSavedIcon] = useState(false)
    return (
        <div className={cl.wrap} onClick={()=>setPopupIsVisible(false)}>
            <div className={cl.popupWrap} onClick={(e)=>e.stopPropagation()}>
                <button className={cl.exitButton} onClick={() => setPopupIsVisible(false)}>x</button>
                <span className={cl.keyIcon}><KeyIcon color={accentColor}/></span>
                <h4 className={cl.title}>Change your password </h4>

                <div className={cl.inputsWrap}>
                    <PasswordInput errors={response?.errors} setPassword={setOldPassword} errorsType={"oldPassword"}
                                   placeholder={"Old password"}/>
                    <PasswordInput errors={response?.errors} setPassword={setNewPassword} errorsType={"newPassword"}
                                   placeholder={"New password"}/>
                </div>

                <div className={cl.buttonsWrap}>
                    {!showSavedIcon&&
                    <ChangePasswordButton setShowSaved={setShowSavedIcon} setResponse={setResponse} oldPassword={oldPassword}
                                          newPassword={newPassword} className={"customButton"}>
                            Change
                    </ChangePasswordButton>}
                    <div className={cl.savedIconWrap}>
                        <SavedIcon  showSavedIcon={showSavedIcon}>Saved</SavedIcon>
                    </div>
                    <button className={"cancelButton"} onClick={() => setPopupIsVisible(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPopup;