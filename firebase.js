import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_ZyR1GGS8U2Hy7oHNyJ2U2rupEcDNqHU",
  authDomain: "goalball-scout.firebaseapp.com",
  projectId: "goalball-scout",
  storageBucket: "goalball-scout.firebasestorage.app",
  messagingSenderId: "276492008838",
  appId: "1:276492008838:web:f0098b7db9f5fbbc8b4007",
  measurementId: "G-DBV94F4219"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function enableFirestorePersistence() {
  try {
    await enableIndexedDbPersistence(db, { synchronizeTabs: true });
  } catch (error) {
    console.warn('Firestore persistence unavailable:', error);
  }
}

export { app, auth, db, enableFirestorePersistence };
