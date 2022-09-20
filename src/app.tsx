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
import EditSong from './components/Music/edit';

type ContextType = {
  dark: boolean;
  setDark: Function;
  songs?: Song[];
  setSongs?: Function;
}
export const StateContext =  createContext<ContextType>({dark: false, setDark: () => {}});

export function App() {
  const [songs, setSongs] = useState<Song[]>([])
  const [dark, setDark] = useState(false)
  const isAuthenticated = () =>{
    return true;
  }

  const sharedValue = {dark, setDark, songs, setSongs}

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
      <Toaster position="bottom-center" reverseOrder={false} />
        <Router onChange={handleRoute}>
          <Profile path="/" />
          <Music path="/music" />
          <AddMusic path="/music/add" />
          <EditSong path="/music/edit" />
          <Calendar path="/calendar" />
        </Router>
      <MenuBar />
    </StateContext.Provider>
  )
}
