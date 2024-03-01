import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const config = {
  apiKey: "AIzaSyDpD_CFW2wrrwr1rf7iabSHY9ecoPjFyTs",
  authDomain: "storyai-2024.firebaseapp.com",
  projectId: "storyai-2024",
  storageBucket: "storyai-2024.appspot.com",
  messagingSenderId: "952083595965",
  appId: "1:952083595965:web:cea547f9e1499c606b2dd4",
  measurementId: "G-9BQTY6PNYD"
}

const app = initializeApp(config);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// connectAuthEmulator(auth, 'http://192.168.0.105:9099');
// connectFirestoreEmulator(firestore, '192.168.0.105', 8080);
// connectStorageEmulator(storage, '192.168.0.105', 9199);

export { auth, storage, firestore };
