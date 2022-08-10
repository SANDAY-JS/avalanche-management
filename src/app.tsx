import './app.css'
import Router from 'preact-router'
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Music from './pages/Music';
import Header from './components/Header'
import MenuBar from './components/MenuBar'
import { createContext } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Auth from './pages/Auth';
import { supabase } from './supabaseClient';

type ContextType = {
  dark: boolean;
  setDark: Function;
}
export const StateContext =  createContext<ContextType>({dark: false, setDark: () => {}});

export function App() {
  const [session, setSession] = useState<any>(null)
  const [dark, setDark] = useState(false)
  const isAuthenticated = () =>{
    return true;
  }

  const sharedValue = {dark, setDark}

  const handleRoute = async(e: any) => {
    // switch (e.url) {
    //   case '/':
    //     const isAuthed = await isAuthenticated();
    //     if (!isAuthed) route('/', true);
    //     break;
    // }
  };

  
  useEffect(() => {
    if (window.matchMedia && !window.matchMedia('(prefers-color-scheme: dark)').matches) return;
    setDark(true)
  }, [])

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])


  return (
    <StateContext.Provider value={sharedValue}>
      <Header />
        <Router onChange={handleRoute}>
          {!session ? <Auth path='/' /> : <Profile path='/' key={session.user.id} session={session} />}
          <Music path="/music" />
          <Calendar path="/calendar" />
        </Router>
      <MenuBar />
    </StateContext.Provider>
  )
}
