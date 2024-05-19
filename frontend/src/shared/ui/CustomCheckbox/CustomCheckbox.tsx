import React, {Dispatch, FC} from 'react';
import cl from './CustomCheckbox.module.css'

interface CustomCheckboxProps {
    name: string,
    labelText: string,
    setCheckbox:Dispatch<boolean>
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({name, labelText, setCheckbox}) => {

    const handleCheckbox = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setCheckbox(e.target.checked)
    }

    return (
        <div className={cl.wrap}>
            <input type="checkbox" id={name} name={name} onChange={(e)=>handleCheckbox(e)}/>
            <label htmlFor={name}>{labelText}</label>
        </div>
    );
};

export default CustomCheckbox;