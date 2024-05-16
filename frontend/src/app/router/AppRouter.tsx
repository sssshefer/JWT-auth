import React, {FC} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import Login from "../../pages/Login/Login";
import Signup from "../../pages/Signup/Signup";
import Account from "../../pages/Account/Account";
import NotFound from "../../pages/NotFound/NotFound";
import {AnimatePresence, motion} from "framer-motion";
import Home from "../../pages/Home/Home";

interface AppRouterProps {
    isAuth: boolean
}

const AppRouter: FC<AppRouterProps> = ({isAuth}) => {
    const publicRoutes = [
        {path: '/', component: Home},
        {path: '/not-found', component: NotFound},
        {path: '/login', component: Login},
        {path: '/signup', component: Signup},
    ]

    const authRoutes = [
        {path: '/account', component: Account},
    ]

    const location = useLocation();

    return (
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                {isAuth && authRoutes.map(route =>
                    <Route path={route.path} element={
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                            <route.component/>
                        </motion.div>
                    }
                           key={route.path}/>
                )}

                {authRoutes.map(route =>
                    <Route path={route.path}
                           element={<motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                               <Navigate to="/login" replace/>
                           </motion.div>
                           }
                           key={route.path}/>
                )}

                {publicRoutes.map(route =>
                    <Route element={<motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                        <route.component/>
                    </motion.div>}
                           path={route.path}
                           key={route.path}/>
                )
                }

                <Route path="*" element={<Navigate to="/not-found" replace/>}/>
            </Routes>
        </AnimatePresence>
    );
};

export default AppRouter;