import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage'
import { getDocs, addDoc, collection, doc, getFirestore, deleteDoc, query, where, updateDoc } from 'firebase/firestore'
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

const getSong = async (path: string, setter: Function): Promise<string | void> => {
  // Play Song
  await getDownloadURL(ref(storage, `songs/${path}`))
      .then((url) => {
        setter(url);
      })
      .catch((error) => {
        console.error(error);
        throw Error()
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

const getSongId = async (id: string): Promise<void | string> => {
  try {
    const q = query(collection(db, 'songs'), where("id", "==", id))
    const querySnapshot = await getDocs(q);
    const theId = querySnapshot.docs.map((doc:any) => doc.id)[0];
    return theId
  } catch (error) {
    console.error(error);
  }
}

const getSongDataById = async (docId: string, setter?: Function): Promise<void | Song> => {
  try {
    const q = query(collection(db, 'songs'), where("id", "==", docId))
    const querySnapshot = await getDocs(q);
    const theSong: Song = querySnapshot.docs.map((doc:any) => doc.data())[0];
    if(setter){
      setter(theSong);
    } else {
      return theSong as Song;
    }
  } catch (error) {
    console.error(error);
  }
}

const editSongData = async (newData: SongWithId): Promise<void> => {
  try {
    const songId = await getSongId(newData.id);
    if(!songId) throw new Error();

    const songRef = doc(db, "songs", songId);
    await updateDoc(songRef, newData)
    .then(() => console.log('done!'))
  } catch (error) {
    console.error(error);
  }
}

const updateSongFile = async (file: File, audioPath: string) => {
  try {
    // Delete Origin File
    console.log(audioPath)
    const desertRef = ref(storage, `songs/${audioPath}`);
    await deleteObject(desertRef)
      .then(() => {
        console.log('deleted a file')
        // Add New File
        const storageRef = ref(storage, `songs/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log(percent)
          },
          (err) => console.log(err),
          () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                  console.log(url);
              });
          }
        );
      }).catch((err) => console.error(err))
  } catch (error) {
    console.error(error);
  }
}

const deleteSongData = async (docId: string, onComplete?: Function) => {
  try {
    const q = query(collection(db, 'songs'), where("id", "==", docId))
    const querySnapshot = await getDocs(q);
    const id = querySnapshot.docs.map((doc:SongWithId) => doc.id)[0];
    await deleteDoc(doc(db, "songs", id))
    .then(() => {
      console.log('deleted!')
      if(onComplete) {
        onComplete();
      }
    });
    
    const audioPath = querySnapshot.docs.map((doc:any) => doc.data())[0].audio_path;
    const desertRef = ref(storage, `songs/${audioPath}`);
    await deleteObject(desertRef)
      .then(() => {
        console.log('deleted a file')
      }).catch((error) => {
        console.error(`cannot remove a file ${audioPath}`, error);
      });
  } catch (error) {
    console.error(error);
  }
}


export { app, storage, ref, getDownloadURL, getSong, uploadSongFile, uploadSongData, getSongData, editSongData, deleteSongData, getSongDataById, updateSongFile };