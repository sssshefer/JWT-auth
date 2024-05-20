import {IUser} from "../types/IUser";
import React, {createContext, Dispatch, ReactNode, SetStateAction} from "react";

export interface IUserContext {
    user: IUser | undefined,
    setUser: Dispatch<SetStateAction<IUser|undefined>>
}

const defaultUserContext = {
    user: undefined,
    setUser: () => {}
} as IUserContext

export const UserContext = createContext(defaultUserContext)

type UserProviderProps = {
    children: ReactNode
}

export default function UserProvider({children}: UserProviderProps) {
    const [user, setUser] = React.useState<IUser | undefined>(defaultUserContext.user)
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}