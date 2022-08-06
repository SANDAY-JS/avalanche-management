import './app.css'
import Router, { route } from 'preact-router'
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Music from './pages/Music';
import Header from './components/Header'
import MenuBar from './components/MenuBar'
import { createContext } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useQuery, gql } from '@apollo/client';

type ContextType = {
  dark: boolean;
  setDark: Function;
}
export const StateContext =  createContext<ContextType>({dark: false, setDark: () => {}});

export function App() {
  const [dark, setDark] = useState(false)
  const isAuthenticated = () =>{
    return true;
  }

  const sharedValue = {dark, setDark}

  const handleRoute = async(e: any) => {
    switch (e.url) {
      case '/profile':
        const isAuthed = await isAuthenticated();
        if (!isAuthed) route('/login', true);
        break;
    }
  };

  
  useEffect(() => {
    if (window.matchMedia && !window.matchMedia('(prefers-color-scheme: dark)').matches) return;
    setDark(true)
  }, [])


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
