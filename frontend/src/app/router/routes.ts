import Home from "../../pages/Home/Home";
import NotFound from "../../pages/NotFound/NotFound";
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import Account from "../../pages/Account/Account";

export interface IRoute {
    path: string,
    component: any
}

export const publicRoutes:IRoute[] = [
    {path: '/', component: Home},
    {path: '/not-found', component: NotFound},
    {path: '/login', component: Login},
    {path: '/signup', component: Signup},
]

export const authRoutes:IRoute[] = [
    {path: '/account', component: Account},
]