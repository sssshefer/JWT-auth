import React, {FC} from 'react';
import {IFormError} from "../../shared/types/IFormError";

interface IFilteredErrorProps {
    errors: IFormError[] | undefined,
    type: string,
    className?: string
}

const FilteredFormError: FC<IFilteredErrorProps> = ({errors, type, className, ...props}) => {
    const error = errors?.find(formError => formError.path === type)?.msg;

    if (!error)
        return null;

    return (
        <p {...props} className={`error ${className}`}>
            {error}
        </p>
    );
};

export default FilteredFormError;