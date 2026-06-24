import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js"; 
const firebaseConfig = {
  apiKey: "AIzaSyA_eTabpa9spioE_pGOJUZ-wRM4rIvLKGA",
  authDomain: "suria-food-ordering-system.firebaseapp.com",
  projectId: "suria-food-ordering-system",
  storageBucket: "suria-food-ordering-system.firebasestorage.app",
  messagingSenderId: "204528329291",
  appId: "1:204528329291:web:cba270a2968e6d159963ce"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 