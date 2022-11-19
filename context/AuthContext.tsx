import React, { useContext, createContext, ReactNode, useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

type authContextType = {
    user: {} | null;
    register: (email:string, password:string) => void;
    emailSignIn: (email:string, password:string) => void;
    googleSignIn: () => void;
    logOut: () => void;
}

const authContextDefaultValues: authContextType = {
    user: null,
    register: (email, password) => {},
    emailSignIn: () => {},
    googleSignIn: () => {},
    logOut: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);


export const AuthContextProvider = ({ children }: {children: ReactNode}) => {
    const [user, setUser] = useState<{} | null>(null);

    const register = (email:string, password:string) => {
        createUserWithEmailAndPassword(auth, email, password);

        setDoc(doc(db, 'users', email), {
            savedMovies: [],
            savedShows: []
        }, { merge: true });

        return signInWithEmailAndPassword(auth, email, password);
    };

    const emailSignIn = (email:string, password:string) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };

    useEffect(() => {
        const updateUser = onAuthStateChanged(auth, currentUser => setUser(currentUser));

        console.log(user);

        return () => updateUser();
    }, []);

    const logOut = () => signOut(auth);

    const value = {
        user,
        register,
        emailSignIn,
        googleSignIn,
        logOut
    };

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);