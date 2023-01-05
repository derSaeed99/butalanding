import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore/lite";

import { ContactFormValues, ValuationFormValues } from "./Types/interfaces";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// firebase functions

export const firebaseGetProductsValuations = async () => {
  const productsValuations = collection(db, "productsValuations");
  const productsValuationsSnapshot = await getDocs(productsValuations);
  const productsValuationsList = productsValuationsSnapshot.docs.map((doc) =>
    doc.data()
  );
  return productsValuationsList;
};

export const firebaseAddProductsValuations = async (
  productsValuations?: ValuationFormValues
) => {
  await addDoc(collection(db, "productsValuations"), productsValuations);
  return;
};

export const firebaseGetContactMessages = async () => {
  const contactMessages = collection(db, "contactMessages");
  const contactMessagesSnapshot = await getDocs(contactMessages);
  const contactMessagesList = contactMessagesSnapshot.docs.map((doc) =>
    doc.data()
  );
  return contactMessagesList;
};

export const firebaseAddContactMessages = async (
  contactMessages: ContactFormValues
) => {
  await addDoc(collection(db, "contactMessages"), contactMessages);
  return;
};
