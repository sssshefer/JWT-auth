import React, {FC} from 'react';
import cl from './FilteredFormErrors.module.css'
import {IFormError} from "../../shared/types/IFormError";

interface IFilteredErrorsProps {
    errors: IFormError[]|undefined
    type: string;
}

const FilteredFormErrors:FC<IFilteredErrorsProps> = ({errors, type, ...props}) => {
    const isShown = errors?.find(formError => formError.path === type)?.msg;
    if (!isShown) {
        return (<div style={{display: 'none'}}></div>)
    }
    return (
        <p {...props} className={"error"}>
            {errors.find(error => error.path === type)?.msg}
        </p>
    );
};

export default FilteredFormErrors;