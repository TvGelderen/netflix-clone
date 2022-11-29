import React, { useContext, createContext, ReactNode, useState, useEffect } from 'react';
import { User, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

type authContextType = {
    user: User | null;
    register: (email: string, password: string) => void;
    signIn: (email: string, password: string) => Promise<UserCredential> | null;
    logOut: () => void;
};

const authContextDefaultValues: authContextType = {
    user: null,
    register: (email, password) => {},
    signIn: () => { return null },
    logOut: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export const AuthContextProvider = ({ children }: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);

    const register = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => signInWithEmailAndPassword(auth, email, password))
          .then((response) => {
            console.log(response.user)
            setDoc(doc(db, 'customers', response.user.uid), {
                savedMovies: []
            }, { merge: true });
          });
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