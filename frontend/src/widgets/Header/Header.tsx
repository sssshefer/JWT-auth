import React, {FC} from 'react';
import cl from './Header.module.css'
import {Link} from "react-router-dom";
import CustomLink from "../../shared/ui/CustomLink/CustomLink";

export interface IMenuItem {
    id: string,
    title: string
    link: string

}

interface HeaderProps {
    menu?: IMenuItem[],
    isAuth: boolean
}

const Header: FC<HeaderProps> = ({menu, isAuth}) => {
    return (
        <div className={cl.wrap}>
            <div className={cl.navigation}>
                {menu?.map((item: IMenuItem) =>
                    <div key={item.id}>
                        {item.title}
                    </div>)}
            </div>
            <div className={cl.registration}>
                {isAuth ?
                    <div>Logout</div>
                    :
                    <ul>
                        <li>
                            <CustomLink to={'login'}>
                                Log in
                            </CustomLink>
                        </li>
                        <li>
                            <CustomLink to={'signup'}>
                                Sign up
                            </CustomLink>
                        </li>
                    </ul>}
            </div>

        </div>
    );
};

export default Header;