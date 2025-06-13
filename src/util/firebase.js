// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyClTIq0Y__omYhcS3I5P5YhJSVyqweVvw0",
  authDomain: "test-app-prediction.firebaseapp.com",
  projectId: "test-app-prediction",
  storageBucket: "test-app-prediction.firebasestorage.app",
  messagingSenderId: "956196013005",
  appId: "1:956196013005:web:8357e0f20cf3400d943a84",
  measurementId: "G-42QJ7DKJ0Q"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Optional: Analytics (only on client)
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  });
}

export { db };
