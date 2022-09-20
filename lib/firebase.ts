import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { getDocs, addDoc, collection, doc, getFirestore, deleteDoc } from 'firebase/firestore'
import { ToastType } from "../src/types/global";

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
  // Play Song
  getDownloadURL(ref(storage, path))
      .then((url) => {
          audioEl.setAttribute('src', url);
      })
      .catch((error) => {
          console.error(error);
      });
}

const uploadSongFile = async (file: File, toast: ToastType, loadingPercentage: number, setLoadingPercentage: Function, onComplete: Function) => {
  if(!file) {
    toast.error('オーディオファイルを選択してください');
    return;
  }

  const toastId = toast.loading(`アップロード中 / ${loadingPercentage}%`)

  try {
    const storageRef = ref(storage, `/songs/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
          const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setLoadingPercentage(percent);
      },
      (err) => {
        toast.dismiss(toastId);
        toast.error('アップロードに失敗しました')
        console.error(err)
      },
      () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              console.log('Uploaded a song file as >>', url);
              toast.dismiss(toastId);
              toast.success('新しい曲を追加しました！');
              onComplete();
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
    await addDoc(collection(db, 'songs'), data);
  } catch (error) {
    console.error(error);
  }
}

const getSongData = async (setter: Function) => {
  // Get Song Data
  try {
    await getDocs(collection(db, 'songs')).then((querySnapshot) => {
      setter(querySnapshot.docs.map((doc) => doc.data()))
    });
  } catch (error) {
    console.error(error);
  }
}

const deleteSongData = async (docName: string, onComplete?: Function) => {
  try {
    await deleteDoc(doc(db, "songs", docName));
  } catch (error) {
    console.error(error);
    if(onComplete) {
      onComplete();
    }
  }
}


export { app, storage, ref, getDownloadURL, getSong, uploadSongFile, uploadSongData, getSongData };