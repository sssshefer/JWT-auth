import React, {FC, useEffect, useState} from 'react';
import cl from "./AutoSavedTextInput.module.css";
import SavedIcon from "../../shared/ui/SavedIcon/SavedIcon"
import {useDebouncedSaveToApi} from "../../shared/hooks/useDebouncedSaveToApi";

interface AutoSavedUserInputProps {
    inputName: string,
    defaultValue:any,
    apiMethod: Function,
    successCallback: ({}:any) => void
}

const AutoSavedTextInput:FC<AutoSavedUserInputProps> = ({inputName, apiMethod, successCallback, defaultValue}) => {
    const [propertyValue, setPropertyValue] = useState(defaultValue);
    const [showSavedIcon, apiResponse] = useDebouncedSaveToApi(apiMethod, propertyValue, 500, 500)

    useEffect(() => {
        if(apiResponse?.success)
            successCallback(apiResponse.data)
    }, [apiResponse])

    return (
        <div className={cl.wrap}>
            <input placeholder={propertyValue.toString()} name={inputName}
                   type="text" className={cl.property}
                   value={propertyValue.toString()} onChange={(e) => setPropertyValue(e.target.value)}/>
            <SavedIcon showSavedIcon={showSavedIcon}>Saved</SavedIcon>
        </div>
    );
};

export default AutoSavedTextInput;