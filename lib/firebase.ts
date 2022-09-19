import { initializeApp } from "firebase/app";
import {getStorage, ref, getDownloadURL} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBdzUk_UXYWRKBUqGPU4kiDRmPsZXBu5wY",
  authDomain: "avalanche-management.firebaseapp.com",
  projectId: "avalanche-management",
  storageBucket: "avalanche-management.appspot.com",
  messagingSenderId: "1:669576973482:web:9b4af5c49687d9dffad4d3",
  appId: "669576973482"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

const getSong = (path: string, audioEl: HTMLElement) => {
  getDownloadURL(ref(storage, path))
      .then((url) => {
          // const xhr = new XMLHttpRequest();
          // xhr.responseType = 'blob';
          // xhr.onload = (event) => {
          //     const blob = xhr.response;
          // };
          // xhr.open('GET', url);
          // xhr.send();
          audioEl.setAttribute('src', url);
          console.log('url', url)
      })
      .catch((error) => {
          console.error(error);
      });
}


export {app, storage, ref, getDownloadURL, getSong};