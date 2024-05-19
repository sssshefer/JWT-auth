import React, {FC, useContext, useEffect, useState} from 'react';
import cl from "./AutoSavedUserInput.module.css";
import SavedIcon from "../../shared/ui/icons/SavedIcon/SavedIcon"
import {useDebouncedSaveToApi} from "../../shared/hooks/useDebouncedSaveToApi";
import {IUser} from "../../shared/types/IUser";
import {UserContext} from "../../shared/store/UserContext";

interface AutoSavedUserInputProps {
    userPropertyName: keyof IUser,
    apiMethod: Function

}

const AutoSavedUserInput:FC<AutoSavedUserInputProps> = ({userPropertyName, apiMethod}) => {
    const {user, setUser} = useContext(UserContext)
    const [propertyValue, setPropertyValue] = useState(user ? user[userPropertyName] : 0);
    const [showSavedIcon, apiResponse] = useDebouncedSaveToApi(apiMethod, propertyValue, 500, 500)


    useEffect(() => {
        if(apiResponse?.success)
            setUser( apiResponse.data)
    }, [apiResponse])

    return (
        <div className={cl.wrap}>
            <input placeholder={propertyValue.toString()} name={userPropertyName}
                   type="text" className={cl.property}
                   value={propertyValue.toString()} onChange={(e) => setPropertyValue(e.target.value)}/>
            <SavedIcon showSavedIcon={showSavedIcon}>Saved</SavedIcon>
        </div>
    );
};

export default AutoSavedUserInput;