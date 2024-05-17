import React, {FC, useEffect, useRef} from 'react';
import {CSSTransition} from "react-transition-group";
import cl from './SavedIcon.module.css'

interface SavedIconProps {
    showSavedIcon: boolean,
    children: any
}

const SavedIcon: FC<SavedIconProps> = ({showSavedIcon, children}) => {
    const savedIconNode = useRef(null)
    return (<span className={cl.wrap}>
            <CSSTransition
                nodeRef={savedIconNode}
                in={showSavedIcon}
                timeout={200}
                classNames={{
                    exit: cl.savedIconExit,
                    exitActive: cl.savedIconExitActive
                }}
                unmountOnExit>
                            <span className={cl.savedIcon} ref={savedIconNode}>
                                {children}
                            </span>
            </CSSTransition>
        </span>

    );
};

export default SavedIcon;