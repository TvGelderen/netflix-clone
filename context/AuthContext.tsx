import React, { useContext, createContext, ReactNode, useState, useEffect } from 'react';
import { User, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { auth, db } from '../firebase';
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from 'firebase/firestore';

type authContextType = {
    user: User | null;
    register: (email: string, password: string) => void;
    signIn: (email: string, password: string) => Promise<UserCredential> | null;
    logOut: () => void;
};

const authContextDefaultValues: authContextType = {
    user: null,
    register: () => { return null },
    signIn: () => { return null },
    logOut: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export const AuthContextProvider = ({ children }: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);

    const register = async (email: string, password: string) => {
        return await createUserWithEmailAndPassword(auth, email, password)
          .then(() => signInWithEmailAndPassword(auth, email, password));
    };

    const signIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const updateUser = onAuthStateChanged(auth, currentUser => setUser(currentUser));

        return () => updateUser();
    }, []);

    const logOut = () => signOut(auth);

    const value = {
        user,
        register,
        signIn,
        logOut
    };

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);