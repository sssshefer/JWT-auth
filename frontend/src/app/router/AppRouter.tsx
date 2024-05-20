import React, {FC} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import {AnimatePresence, motion} from "framer-motion";
import {authRoutes, IRoute, publicRoutes} from "./routes";

interface AppRouterProps {
    isAuth: boolean
}

const AppRouter: FC<AppRouterProps> = ({isAuth}) => {
    const location = useLocation();
    return (
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                {isAuth && authRoutes.map((route: IRoute) =>
                    <Route path={route.path}
                           element={
                               <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                                   <route.component/>
                               </motion.div>
                           }
                           key={route.path}/>
                )}

                {authRoutes.map((route: IRoute) =>
                    <Route path={route.path}
                           element={
                               <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                                   <Navigate to="/login" replace/>
                               </motion.div>
                           }
                           key={route.path}/>
                )}

                {publicRoutes.map((route: IRoute) =>
                    <Route path={route.path}
                           element={
                               <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                                   <route.component/>
                               </motion.div>}
                           key={route.path}/>
                )}

                <Route path="*" element={<Navigate to="/not-found" replace/>}/>
            </Routes>
        </AnimatePresence>
    );
};

export default AppRouter;