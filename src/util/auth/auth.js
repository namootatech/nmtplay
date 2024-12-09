import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { omit } from 'ramda';
import { db, auth } from '../firebase';

const googleProvider = new GoogleAuthProvider();

export const registerishaWithEmail = async (data) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.nomyayi,
      data.password
    );

    const userId = userCredential.user.uid;
    const user = userCredential.user;
    const userDetails = omit(['password'], data);

    await setDoc(doc(db, 'users', userId), {
      ...userDetails,
      nomyayi: user.email,
      gama: user.displayName || userDetails.igama || 'Anonymous Mgutyuli',
      profilePic: user.profilePic || userDetails.profilePic || null,
      cellNamba: user.phoneNumber || userDetails.cellNamba || null,
      role: user.role || 'mgutyuli',
      createdAt: new Date().toISOString(),
    });

    return userCredential;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const registerishaWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const userId = user.uid;
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', userId), {
        nomyayi: user.email,
        gama: user.displayName || 'Anonymous Beaver',
        isbuko: user.photoURL || null,
        bhelas: user.phoneNumber || null,
        indima: 'mgutyuli',
        createdAt: new Date().toISOString(),
      });
    }

    return result;
  } catch (error) {
    console.error('Error signing up with Google:', error);
    throw error;
  }
};

export const registerishaWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const userId = user.uid;
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', userId), {
        nomyayi: user.email,
        gama: user.displayName || 'Anonymous Beaver',
        isbuko: user.photoURL || null,
        bhelas: user.phoneNumber || null,
        role: 'mgutyuli',
        createdAt: new Date().toISOString(),
      });
    }

    return result;
  } catch (error) {
    console.error('Error signing up with Google:', error);
    throw error;
  }
};

export const loga_in = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const loga_inWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return result;
  } catch (error) {
    console.error('Error logging in with Google:', error);
    throw error;
  }
};

export const loga_inWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return result;
  } catch (error) {
    console.error('Error logging in with Google:', error);
    throw error;
  }
};
