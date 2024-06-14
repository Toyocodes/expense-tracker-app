// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo5TBde3bjHsOVoQ8_TENeNCq2Rk5Hqfg",
  authDomain: "expense-tracker1-349a3.firebaseapp.com",
  projectId: "expense-tracker1-349a3",
  storageBucket: "expense-tracker1-349a3.appspot.com",
  messagingSenderId: "794792561460",
  appId: "1:794792561460:web:6edcb1087adb04f27f7361",
  measurementId: "G-KPKQPLP8KE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

provider.setCustomParameters({
  prompt: 'select_account', 
});
//firebase login
//firebase init
//firebase deploy
