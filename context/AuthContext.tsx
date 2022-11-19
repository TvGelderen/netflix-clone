import React, { useContext, createContext, ReactNode, useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'

type authContextType = {
    user: boolean;
    googleSignIn: () => void;
    logout: () => void;
}

const authContextDefaultValues: authContextType = {
    user: false,
    googleSignIn: () => {},
    logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);


export const AuthContextProvider = ({ children }: {children: ReactNode}) => {
    const [user, setUser] = useState<boolean>(false);

    const logout = () => setUser(false);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    const value = {
        user,
        googleSignIn,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);