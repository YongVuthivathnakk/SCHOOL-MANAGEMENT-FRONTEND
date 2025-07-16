import { useState, useEffect, createContext } from "react";
import { isAuthenticated} from "../../../utils/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = isAuthenticated();

        if(user) {
            setAuth(user);
        } else {
            setAuth(null);
        }
        setLoading(false);
    }, [])

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading }}>
            {children}
        </AuthContext.Provider>
    )
}