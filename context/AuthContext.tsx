import React, { useContext, createContext, ReactNode, useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'

type authContextType = {
    user: {} | null;
    googleSignIn: () => void;
    logOut: () => void;
}

const authContextDefaultValues: authContextType = {
    user: null,
    googleSignIn: () => {},
    logOut: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);


export const AuthContextProvider = ({ children }: {children: ReactNode}) => {
    const [user, setUser] = useState<{} | null>(null);

    const logOut = () => signOut(auth);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    useEffect(() => {
        const updateUser = onAuthStateChanged(auth, currentUser => setUser(currentUser));

        console.log(user);

        return () => updateUser();
    }, [])

    const value = {
        user,
        googleSignIn,
        logOut
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);