import React, {FC, useEffect, useState} from 'react';
import cl from "./AutoSavedTextInput.module.css";
import SavedIcon from "../../shared/ui/SavedIcon/SavedIcon"
import {useDebouncedSaveToApi} from "../../shared/hooks/useDebouncedSaveToApi";

interface AutoSavedUserInputProps  extends React.InputHTMLAttributes<HTMLInputElement>{
    inputName: string,
    defaultValue:any,
    apiMethod: Function,
    successCallback: ({}:any) => void
}

const AutoSavedTextInput:FC<AutoSavedUserInputProps> = ({inputName, apiMethod, successCallback, defaultValue, ...props}) => {
    const [value, setValue] = useState(defaultValue);
    const [showSavedIcon, apiResponse] = useDebouncedSaveToApi(apiMethod, value, 500, 500)

    useEffect(() => {
        if(apiResponse?.success)
            successCallback(apiResponse.data)
    }, [apiResponse])

    return (
        <div className={cl.wrap}>
            <input placeholder={value.toString()}
                   name={inputName}
                   type="text"
                   className={cl.property}
                   value={value.toString()}
                   onChange={(e) => setValue(e.target.value)}
                   {...props}
            />
            <SavedIcon showSavedIcon={showSavedIcon}>Saved</SavedIcon>
        </div>
    );
};

export default AutoSavedTextInput;