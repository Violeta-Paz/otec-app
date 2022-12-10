// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 ////////
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
export const auth = getAuth(app)


const storage = getStorage();

export async function addFile(file, nameFile){
   const storageRef = ref(storage,nameFile)
   await uploadBytes(storageRef, file)
   const url = await getDownloadURL(storageRef)
   return url
}