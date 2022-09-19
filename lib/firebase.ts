import { initializeApp } from "firebase/app";
import {getStorage, ref, getDownloadURL} from 'firebase/storage'
import {getDocs, addDoc, collection, getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBdzUk_UXYWRKBUqGPU4kiDRmPsZXBu5wY",
  authDomain: "avalanche-management.firebaseapp.com",
  projectId: "avalanche-management",
  storageBucket: "avalanche-management.appspot.com",
  messagingSenderId: "1:669576973482:web:9b4af5c49687d9dffad4d3",
  appId: "669576973482"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
const db = getFirestore(app);

const getSong = (path: string, audioEl: HTMLElement) => {
  getDownloadURL(ref(storage, path))
      .then((url) => {
          audioEl.setAttribute('src', url);
      })
      .catch((error) => {
          console.error(error);
      });
}

const uploadSongFile = () => {

}

const uploadSongData = async (data: Song) => {
  try {
    const docRef = await addDoc(collection(db, 'songs'), data);
    console.log(docRef.id)
  } catch (error) {
    console.error(error);
  }
}

const getSongData = async (setter: Function) => {
  const result: any[] = []
  try {
    await getDocs(collection(db, 'songs')).then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => result.push(doc.data()))
      setter(result)
    });
  } catch (error) {
    console.error(error);
  }
}


export { app, storage, ref, getDownloadURL, getSong, uploadSongFile, uploadSongData, getSongData };