import React, {ButtonHTMLAttributes, FC} from 'react';
import cl from './CustomButton.module.css'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactElement | string,
}

const CustomButton: FC<CustomButtonProps> = ({children, ...props}) => {
    return (
        <button {...props} className="customButton">
            {children}
        </button>
    );
};

export default CustomButton;