// Danger Don't Shear

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpkldWZhsxl3iPypWC7Hc58du_JIlKETk",
  authDomain: "explore-email-password-a-102eb.firebaseapp.com",
  projectId: "explore-email-password-a-102eb",
  storageBucket: "explore-email-password-a-102eb.firebasestorage.app",
  messagingSenderId: "423121160265",
  appId: "1:423121160265:web:b89a64b718bb5183e95798"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);