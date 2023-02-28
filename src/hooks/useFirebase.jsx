import { useEffect, useState } from "react";
import initializeAuthentication from "../firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, sendEmailVerification, sendPasswordResetEmail, updateProfile, GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import Swal from "sweetalert2";
// import {  useLocation, useNavigate } from "react-router-dom";

initializeAuthentication();

const useFirebase = () => {

    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    const auth = getAuth();

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    // let navigate = useNavigate();
    // let location = useLocation();

    const google = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                // registerUser(result.user);
                setUser(result.user);
            })
            .catch(error => {
                setError(error.message);
            })
    }

    const github = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                // registerUser(result.user);
                setUser(result.user);
            })
            .catch(error => {
                setError(error.message);
            })
    }

    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email)
            .then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Password reset email sent',
                    text: 'Please check your email for further instructions.',
                })
            })
    }

    const logOut = () => {
        signOut(auth)
            .then(() => {
                setUser({})
                // localStorage.clear();
                window.location.reload();
            })
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            }
            else {
                setUser({});
            }
        });
    }, [])
    return {
        auth,
        setUser,
        user,
        error,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        google,
        github,
        // registerUser,
        sendEmailVerification,
        updateProfile,
        logOut,
        onAuthStateChanged,
        resetPassword
    }
}

export default useFirebase;