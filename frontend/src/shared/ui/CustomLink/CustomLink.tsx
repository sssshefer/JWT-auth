import React, {FC} from 'react';
import cl from './CustomLink.module.css';
import {Link} from "react-router-dom";

interface CustomLinkProps extends React.HTMLProps<HTMLAnchorElement>{
    children: React.ReactElement | string,
    to: string
}

const CustomLink: FC<CustomLinkProps> = ({children, to, ...props}) => {
    return (
        <Link to={to} {...props} className={"customButton"}>
            {children}
        </Link>
    );
};

export default CustomLink;