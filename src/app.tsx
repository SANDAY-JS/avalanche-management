import './app.css'
import Router, { route } from 'preact-router'
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Music from './pages/Music';
import Header from './components/Header'
import MenuBar from './components/MenuBar'
import { createContext } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getSongData } from '../lib/firebase';
import { Toaster } from 'react-hot-toast';
import AddMusic from './pages/Music/add';

type ContextType = {
  dark: boolean;
  setDark: Function;
  testData?: Song[];
}
export const StateContext =  createContext<ContextType>({dark: false, setDark: () => {}});

const testData: Song[] = [
  {title: 'さがしもの', bpm: 80, time_signature: '4/4', length: 4.5, audio_path: 'Holiday.mp3'},
  {title: 'Hero', bpm: 148, time_signature: '2/2', length: 4, audio_path: 'Holiday.mp3'},
]

export function App() {
  const [songs, setSongs] = useState<Song[]>([])
  const [dark, setDark] = useState(false)
  const isAuthenticated = () =>{
    return true;
  }

  const sharedValue = {dark, setDark, songs, setSongs, testData}

  const handleRoute = (e: any) => {
    switch (e.url) {
      case '/profile':
        const isAuthed = isAuthenticated();
        if (!isAuthed) route('/login', true);
        break;
    }
  };

  
  useEffect(() => {
    getSongData(setSongs);

    if (window.matchMedia && !window.matchMedia('(prefers-color-scheme: dark)').matches) return;
    setDark(true)
  }, [])

  useEffect(() => {
    console.log(songs)
  }, [songs])


  return (
    <StateContext.Provider value={sharedValue}>
      <Header />
      <Toaster />
        <Router onChange={handleRoute}>
          <Profile path="/" />
          <Music path="/music" />
          <AddMusic path="/music/add" />
          <Calendar path="/calendar" />
        </Router>
      <MenuBar />
    </StateContext.Provider>
  )
}
