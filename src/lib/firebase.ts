// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, updateEmail, updatePassword, sendPasswordResetEmail, setPersistence, browserSessionPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDoc, query, where, getDocs, updateDoc, arrayUnion, arrayRemove, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBMfXCYQdR96_JzmC7fgeTtn0OGQZIiLgw",
    authDomain: "fry-lyle.firebaseapp.com",
    projectId: "fry-lyle",
    storageBucket: "fry-lyle.appspot.com",
    messagingSenderId: "716610013358",
    appId: "1:716610013358:web:08587a7aa0839afe88c53f",
    measurementId: "G-YEFR2V6558"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Collection references
const clientsCollection = collection(db, "clients");

// Authentication functions
export const registerUser = async (email: string, password: string, userData: any) => {
    try {
        // Create the user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional user data in Firestore clients collection
        await setDoc(doc(clientsCollection, user.uid), {
            uid: user.uid,
            email: user.email,
            ...userData,
            createdAt: new Date()
        });

        return user;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

export const loginUser = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
        // Set persistence based on remember me option
        const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
        await setPersistence(auth, persistenceType);

        // Sign in the user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};

export const getCurrentUser = (): User | null => {
    return auth.currentUser;
};

export const getUserData = async (userId: string) => {
    try {
        const userDoc = await getDoc(doc(clientsCollection, userId));
        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting user data:", error);
        throw error;
    }
};

export const updateUserData = async (userId: string, data: any) => {
    try {
        const userDocRef = doc(clientsCollection, userId);
        await updateDoc(userDocRef, {
            ...data,
            updatedAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error("Error updating user data:", error);
        throw error;
    }
};

export const updateUserEmail = async (newEmail: string) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("No authenticated user found");
        await updateEmail(user, newEmail);

        // Update email in Firestore too
        const userDocRef = doc(clientsCollection, user.uid);
        await updateDoc(userDocRef, {
            email: newEmail,
            updatedAt: serverTimestamp()
        });

        return true;
    } catch (error) {
        console.error("Error updating email:", error);
        throw error;
    }
};

export const updateUserPassword = async (newPassword: string) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("No authenticated user found");
        await updatePassword(user, newPassword);
        return true;
    } catch (error) {
        console.error("Error updating password:", error);
        throw error;
    }
};

export const sendPasswordReset = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return true;
    } catch (error) {
        console.error("Error sending password reset:", error);
        throw error;
    }
};

export const uploadProfileImage = async (userId: string, file: File) => {
    try {
        // Create a storage reference
        const storageRef = ref(storage, `profile_images/${userId}/${Date.now()}_${file.name}`);

        // Upload the file
        const snapshot = await uploadBytes(storageRef, file);

        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Update the user's profile in Firestore
        const userDocRef = doc(clientsCollection, userId);
        await updateDoc(userDocRef, {
            profileImage: downloadURL,
            updatedAt: serverTimestamp()
        });

        return downloadURL;
    } catch (error) {
        console.error("Error uploading profile image:", error);
        throw error;
    }
};

export const addAddressToUser = async (userId: string, address: any) => {
    try {
        const userDocRef = doc(clientsCollection, userId);
        await updateDoc(userDocRef, {
            addresses: arrayUnion(address),
            updatedAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error("Error adding address:", error);
        throw error;
    }
};

export const removeAddressFromUser = async (userId: string, address: any) => {
    try {
        const userDocRef = doc(clientsCollection, userId);
        await updateDoc(userDocRef, {
            addresses: arrayRemove(address),
            updatedAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error("Error removing address:", error);
        throw error;
    }
};

export { app, auth, db, storage, clientsCollection };