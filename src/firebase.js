import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA2JNd3esVR5bADgFzjzleMeciW16SJpl8",
  authDomain: "linkedin-clone-cd539.firebaseapp.com",
  projectId: "linkedin-clone-cd539",
  storageBucket: "linkedin-clone-cd539.appspot.com",
  messagingSenderId: "349146209893",
  appId: "1:349146209893:web:793ff14de731e061e1308c",
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth()
const provider = new GoogleAuthProvider()
const storage = getStorage(firebaseApp)

export default db

export { auth, provider, storage }
