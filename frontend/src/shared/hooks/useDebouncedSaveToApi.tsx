import React, {useEffect, useState} from 'react';
import {useDebounce} from "./useDebounce";
import {IResponse} from "../types/IResponse";

interface UseDebouncedSaveToApiProps {
    (apiMethod: Function,
     propertyValue: any,
     debounceTime: number,
     shownIconTime: number): [boolean, IResponse]
}

export const useDebouncedSaveToApi: UseDebouncedSaveToApiProps = (apiMethod, propertyValue, debounceTime, shownIconTime) => {
    const debouncedDataToSend = useDebounce(propertyValue, debounceTime)
    const [response, setResponse] = useState<IResponse|undefined>(undefined)
    const [firstRender, setFirstRender] = useState<boolean>(true)
    const [showSavedIcon, setShowSavedIcon] = useState<boolean>(false)
    useEffect(() => {
        if (firstRender) {
            setFirstRender(false)
        } else {
            handleSaveProperty()
        }

        async function handleSaveProperty() {
            const response = apiMethod(debouncedDataToSend)
            setResponse(response)
            setShowSavedIcon(true)
            setTimeout(() => {
                setShowSavedIcon(false)
            }, shownIconTime)
        }

    }, [debouncedDataToSend])
    return [showSavedIcon, debouncedDataToSend];
}
