import { initializeApp } from "firebase/app";
import { FirebaseStorage, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA_HVLd5KiIiZWn6cG5q3Q0wEO_2BEkOug",
  authDomain: "iparque-tcc.firebaseapp.com",
  projectId: "iparque-tcc",
  storageBucket: "iparque-tcc.appspot.com",
  messagingSenderId: "1060873052775",
  appId: "1:1060873052775:web:2ca1d48eec2bfe138e2ac2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imageDataBase: FirebaseStorage = getStorage(app);

export { imageDataBase };
