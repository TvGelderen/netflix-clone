import React, { useContext, createContext, ReactNode, useState, useEffect } from 'react';
import { User, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { auth } from '../firebase';

type authContextType = {
    user: User | null;
    register: (email: string, password: string) => void;
    signIn: (email: string, password: string) => Promise<UserCredential> | null;
    logOut: () => void;
    loading: boolean;
};

const authContextDefaultValues: authContextType = {
    user: null,
    register: () => { return null },
    signIn: () => { return null },
    logOut: () => {},
    loading: true,
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export const AuthContextProvider = ({ children }: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const register = async (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => signInWithEmailAndPassword(auth, email, password))
          .catch((error) => {
            console.log(error)
          })
    };

    const signIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const updateUser = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => updateUser();
    }, []);

    const logOut = () => signOut(auth);

    const value = {
        user,
        register,
        signIn,
        logOut,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);