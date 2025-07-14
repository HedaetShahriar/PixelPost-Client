import { useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth';

import AuthContext from "./AuthContext";
import { auth } from "../features/auth/firebase.config";

const AuthProvider = ({ children }) => {
    const[user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signInWithEmail = async (email, password) => {
        setLoading(true);
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } finally {
            setLoading(false);
        }
    }
    const registerWithEmail = async (email, password) => {
        setLoading(true);
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } finally {
            setLoading(false);
        }
    };
    const googleSignIn = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            return await signInWithPopup(auth, provider);
        } finally {
            setLoading(false);
        }
    };
    const logOut = async () => {
        setLoading(true);
        try {
            return await signOut(auth);
        } finally {
            setLoading(false);
        }
    };
    const updateUserProfile = async (displayName, photoURL) => {
        return await updateProfile(auth.currentUser, {
            displayName,
            photoURL
        });
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authData = {
        user,
        setUser,
        loading,
        setLoading,
        signInWithEmail,
        registerWithEmail,
        googleSignIn,
        logOut,
        updateUserProfile
    };
    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;