import { initializeApp } from "firebase/app";
import {getStorage, ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
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

const uploadSongFile = async (file: File, toast: Function) => {
  if(!file) {
    alert('オーディオファイルを選択してください');
    return;
  }

  try {
    const storageRef = ref(storage, `/songs/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
          const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(percent)
      },
      (err) => console.error(err),
      () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log('Uploaded a song file as >>', url);
              toast('新しい曲を追加しました！');
          });
      }
  ); 
  } catch (error) {
    console.error(error);
  }
}

const uploadSongData = async (data: Song) => {
  try {
    console.log('data>>', data);
    const docRef = await addDoc(collection(db, 'songs'), data);
    console.log('song data has uploaded', docRef.id)
  } catch (error) {
    console.error(error);
  }
}

const getSongData = async (setter: Function) => {
  try {
    await getDocs(collection(db, 'songs')).then((querySnapshot) => {
      setter(querySnapshot.docs.map((doc) => doc.data()))
    });
  } catch (error) {
    console.error(error);
  }
}


export { app, storage, ref, getDownloadURL, getSong, uploadSongFile, uploadSongData, getSongData };