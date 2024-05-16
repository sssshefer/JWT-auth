import React, {useEffect, useState} from 'react';
import cl from './Account.module.css'
import UserIcon from "../../shared/ui/icons/UserIcon";


const Account = () => {
    //const [user, setUser] = useState(userDetails)
    return (
        <div className={cl.wrap}>
            {/*{<UserDetails user={user}/>}*/}
            <div className={cl.userIconWrap}>
                <UserIcon color={"var(--accent-color)"}/> Account page
            </div>
        </div>
    );
};

export default Account;