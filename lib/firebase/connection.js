import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const config = {
  apiKey: "AIzaSyBtfOTTxlZZFle5CDiCutgEPPmvEgGciIc",
  authDomain: "lightai-2fc73.firebaseapp.com",
  projectId: "lightai-2fc73",
  storageBucket: "lightai-2fc73.appspot.com",
  messagingSenderId: "760812136554",
  appId: "1:760812136554:web:dda8a2643868f9e7260213",
  measurementId: "G-FM8DPQCDYW"
}  

const app = initializeApp(config);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

connectAuthEmulator(auth, 'http://192.168.0.105:9099');
connectFirestoreEmulator(firestore, '192.168.0.105', 8080);
connectStorageEmulator(storage, '192.168.0.105', 9199);

export { auth, storage, firestore };
