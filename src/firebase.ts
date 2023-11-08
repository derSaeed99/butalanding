import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";

import {
  CaContactFormValues,
  CaProduct,
  CaValuationFormValues,
} from "./Types/interfaces";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDq0HA9ZkVB7V1YZQpOTauchVIKbbdFvkQ",
  authDomain: "butalanding.firebaseapp.com",
  projectId: "butalanding",
  storageBucket: "butalanding.appspot.com",
  messagingSenderId: "222534729590",
  appId: "1:222534729590:web:08b8a5a74a8a9bcdfcc457",
  measurementId: "G-3XV20L0YJL",
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
  productsValuations?: CaValuationFormValues
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
  contactMessages: CaContactFormValues
) => {
  await addDoc(collection(db, "contactMessages"), contactMessages);
  return;
};

export const firebaseAddItemToCart = async (product: CaProduct) => {
  const cartRef = doc(db, "carts", product.id);
  const cartDoc = await getDoc(cartRef);
  if (cartDoc.exists()) {
    // If the cart document already exists, update it with the new item
    await updateDoc(cartRef, {
      items: [...cartDoc.data().items, product],
    });
  } else {
    // If the cart document doesn't exist, create a new one with the new item
    await setDoc(cartRef, {
      items: [product],
    });
  }
};
