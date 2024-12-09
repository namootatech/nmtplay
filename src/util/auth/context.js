// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db, analytics } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { mergeAll } from 'ramda';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('User logged in:', user);
        const dbUserRef = doc(db, 'users', user.uid);
        try {
          const snapshot = await getDoc(dbUserRef);
          if (snapshot.exists()) {
            const data = snapshot.data();
            setCurrentUser(mergeAll([user, data])); // Use mergeAll instead of mergeAll
          } else {
            console.log('No user data found');
            setCurrentUser(user);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  console.log('saving curtrent user to context', currentUser);
  const value = { currentUser, logout, db, analytics, auth };
  console.log('saving value to context', value);
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
