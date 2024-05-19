import React, {ButtonHTMLAttributes, FC} from 'react';
import cl from './CustomButton.module.css'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    children: React.ReactElement | string,
}

const CustomButton: FC<CustomButtonProps> = ({children, className, ...props}) => {
    return (
        <button {...props} className={`customButton ${className}`}>
            {children}
        </button>
    );
};

export default CustomButton;