import React, {FC} from 'react';
import cl from './Header.module.css'
import {Link} from "react-router-dom";
import CustomLink from "../../shared/ui/CustomLink/CustomLink";
import LogOutButton from "../../features/LogOutButton/LogOutButton";
import {IResponse} from "../../shared/types/IResponse";
import {IUser} from "../../shared/types/IUser";

export interface IMenuItem {
    id: string,
    title: string
    link: string

}

interface HeaderProps {
    menu?: IMenuItem[],
    isAuth: boolean,
}

const Header: FC<HeaderProps> = ({menu, isAuth}) => {

    return (
        <div className={cl.wrap}>
            <div className={cl.navigation}>
                {menu?.map((item: IMenuItem) =>
                    <Link to={item.link} key={item.id}>
                        {item.title}
                    </Link>)}
            </div>
            <div className={cl.registration}>
                {isAuth ?
                    <ul>
                        <li>
                            <LogOutButton> Log out </LogOutButton>
                        </li>
                        <li>
                            <CustomLink to={'account'}>
                                Account
                            </CustomLink>
                        </li>

                    </ul>
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