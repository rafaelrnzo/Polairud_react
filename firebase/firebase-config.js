// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1jHOfeOQf-Y1pD2x0FDzCiOgKuSHm0wE",
  authDomain: "polairud-55026.firebaseapp.com",
  projectId: "polairud-55026",
  storageBucket: "polairud-55026.appspot.com",
  messagingSenderId: "60779433677",
  appId: "1:60779433677:web:fc23329c59e5a56cda2384"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
