import './app.css'
import { Router, Route, route } from 'preact-router'
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Music from './pages/Music';
import Header from './components/Header'
import MenuBar from './components/MenuBar'
import { createContext } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getSong, getSongData } from '../lib/firebase';
import { toast, Toaster } from 'react-hot-toast';
import AddMusic from './pages/Music/add';
import EditSong from './components/Music/edit';
import PlayMusic from './components/Music/PlayMusic';
import Layout from './components/ui/Layout';

type ContextType = {
  dark: boolean;
  setDark: Function;
  songs: Song[];
  setSongs: Function;
  currentSong: string;
  setCurrentSong: Function;
}
export const StateContext = createContext<any>(null);
// export const StateContext =  createContext({dark: false, setDark: () => {}});

export function App() {
  const [currentSong, setCurrentSong] = useState<string>('')
  const [currentSongAsUrl, setCurrentSongAsUrl] = useState<string>('')
  const [songs, setSongs] = useState<Song[]>([])
  const [dark, setDark] = useState(false)
  const isAuthenticated = () =>{
    return true;
  }

  const sharedValue: ContextType = {dark, setDark, songs, setSongs, currentSong, setCurrentSong}

  const handleRoute = (e: any) => {
    switch (e.url) {
      case '/profile':
        const isAuthed = isAuthenticated();
        if (!isAuthed) route('/login', true);
        break;
    }
  };

  const getCurrentSongUrl = async () => {
    await getSong(currentSong, setCurrentSongAsUrl).catch(() => toast.error('曲を取得できませんでした'))
  }

  useEffect(() => {
    getSongData(setSongs);

    if (window.matchMedia && !window.matchMedia('(prefers-color-scheme: dark)').matches) return;
    setDark(true)
  }, [])

  useEffect(() => {
    if(!currentSong) return;
    getCurrentSongUrl()
  }, [currentSong])

  return (
    <StateContext.Provider value={sharedValue}>
      <Header />
      <Toaster position="bottom-center" reverseOrder={false} />
      <Layout>
        <Router onChange={handleRoute}>
          <Route path='/' component={Profile} />
          <Route path='/music' component={Music} />
          <Route path='/music/add' component={AddMusic} />
          <Route path='/music/edit' component={EditSong} />
          <Route path='/calendar' component={Calendar} />
        </Router>
      </Layout>
      {currentSongAsUrl && <PlayMusic currentSongAsUrl={currentSongAsUrl} />}
      <MenuBar />
    </StateContext.Provider>
  )
}
