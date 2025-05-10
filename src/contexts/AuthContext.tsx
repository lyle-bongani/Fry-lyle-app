import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    auth,
    db,
    loginUser,
    logoutUser,
    getCurrentUser,
    registerUser,
    getUserData,
    updateUserData,
    updateUserEmail,
    updateUserPassword,
    sendPasswordReset,
    uploadProfileImage,
    addAddressToUser,
    removeAddressFromUser
} from '../lib/firebase';
import { User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { resetFirstVisit } from '../services/routeService';

interface AuthContextType {
    currentUser: User | null;
    userData: any | null;
    isLoading: boolean;
    login: (email: string, password: string, rememberMe?: boolean) => Promise<User>;
    logout: () => Promise<void>;
    register: (email: string, password: string, userData: any) => Promise<User>;
    updateUser: (data: any) => Promise<boolean>;
    updateEmail: (email: string) => Promise<boolean>;
    updatePassword: (password: string) => Promise<boolean>;
    resetPassword: (email: string) => Promise<boolean>;
    uploadProfilePicture: (file: File) => Promise<string>;
    addAddress: (address: any) => Promise<boolean>;
    removeAddress: (address: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setCurrentUser(user);

            if (user) {
                // Listen for user data changes
                const userDocRef = doc(db, 'clients', user.uid);
                const userUnsubscribe = onSnapshot(userDocRef, (doc) => {
                    if (doc.exists()) {
                        setUserData(doc.data());
                    } else {
                        setUserData(null);
                    }
                    setIsLoading(false);
                }, (error) => {
                    console.error("Error fetching user data:", error);
                    setIsLoading(false);
                });

                return () => userUnsubscribe();
            } else {
                setUserData(null);
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    // Authentication functions
    const login = async (email: string, password: string, rememberMe: boolean = false) => {
        return loginUser(email, password, rememberMe);
    };

    const logout = async () => {
        setUserData(null);
        resetFirstVisit();
        return logoutUser();
    };

    const register = async (email: string, password: string, userData: any) => {
        return registerUser(email, password, userData);
    };

    // User data update functions
    const updateUser = async (data: any) => {
        if (!currentUser) throw new Error("No authenticated user");
        return updateUserData(currentUser.uid, data);
    };

    const updateEmail = async (email: string) => {
        return updateUserEmail(email);
    };

    const updatePassword = async (password: string) => {
        return updateUserPassword(password);
    };

    const resetPassword = async (email: string) => {
        return sendPasswordReset(email);
    };

    const uploadProfilePicture = async (file: File) => {
        if (!currentUser) throw new Error("No authenticated user");
        return uploadProfileImage(currentUser.uid, file);
    };

    const addAddress = async (address: any) => {
        if (!currentUser) throw new Error("No authenticated user");
        return addAddressToUser(currentUser.uid, address);
    };

    const removeAddress = async (address: any) => {
        if (!currentUser) throw new Error("No authenticated user");
        return removeAddressFromUser(currentUser.uid, address);
    };

    const value = {
        currentUser,
        userData,
        isLoading,
        login,
        logout,
        register,
        updateUser,
        updateEmail,
        updatePassword,
        resetPassword,
        uploadProfilePicture,
        addAddress,
        removeAddress
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
} 