import { createContext, useState, PropsWithChildren, FC, useEffect} from "react";
import __ from "../api/__";
import { IUser } from "../types/IUser";
import cookies from 'js-cookie'

interface IAuthContextDataUnauthorized {
    isAuthenticated: false;
    user: null;
}

interface IAuthContextDataAuthorized {
    isAuthenticated: true;
    user: IUser
}

interface IAuthContextMethods {
    login(): void;
    fetchUser(): void;
    logout(): void;
}

type AuthContextUserData = IAuthContextDataUnauthorized | IAuthContextDataAuthorized;
type AuthContextData = AuthContextUserData & IAuthContextMethods; 

export const AuthContext = createContext<AuthContextData>({
    isAuthenticated: false,
    user: null,
    login: () => {},
    fetchUser: () => {},
    logout: () => {}
})

const AuthProvider: FC<PropsWithChildren> = ({children}) => {
    const [state, setState] = useState<AuthContextUserData>({
        isAuthenticated: false,
        user: null,
    });

    useEffect(() => {
        fetchUser();
    } , []);

    const login = () => {
        window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1010914040584871966&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Flogin%2Fcallback&response_type=code&scope=identify';
    }
    
    const fetchUser = async () => {
        try {
            const {data: user} = await __.get('/users/me');
            if(user) {
                setState({
                    isAuthenticated: true,
                    user,
                })
            }
        } catch (error) {
            setState({
                isAuthenticated: false,
                user: null,
            })
        }
    }

    const logout = async () => {
        cookies.remove('token');
        setState({
            isAuthenticated: false,
            user: null,
        })
    }
    
    return <AuthContext.Provider value={{
        ...state,
        login,
        fetchUser,
        logout,
    }}>{children}</AuthContext.Provider>
}

export default AuthProvider;