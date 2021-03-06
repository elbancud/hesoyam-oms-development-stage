import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase';
import firebase from 'firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [key, setKey] = useState();
    const [currentFile, setCurrentFile] = useState("");
    
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function setCurrentfileState(file) {
        setCurrentFile(file)
    }
    function getCurrentfile() {
        return currentFile
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user ? user.email : "")
            if (user) {
                const dbRef = firebase.database().ref("account-details");
                      dbRef.on('value', snapshot => {
                          snapshot.forEach(snap => {
                              if (user.email === snap.val().email) {
                                  setKey(snap.key)
                                  }
                              });
                      })
                
            } 
        })

        return unsubscribe

    },[])
        const value = {
            currentUser,
            key,
            login,
            setCurrentfileState,
            getCurrentfile
        }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>            
    )
}

