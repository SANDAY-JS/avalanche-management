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

type ContextType = {
  dark: boolean;
  setDark: Function;
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
        <Router onChange={handleRoute}>
          <Profile path="/" />
          <Music path="/music" />
          <Calendar path="/calendar" />
        </Router>
      <MenuBar />
    </StateContext.Provider>
  )
}
