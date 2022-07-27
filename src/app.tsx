import './app.css'
import Router, { route } from 'preact-router'
import Header from './components/Header'
import MenuBar from './components/MenuBar'
import Profile from './components/Profile';
import Music from './components/Music';
import Calendar from './components/Calendar';

export function App() {
  const isAuthenticated = () =>{
    return false;
  }

  const handleRoute = async(e: any) => {
    switch (e.url) {
      case '/profile':
        const isAuthed = await isAuthenticated();
        if (!isAuthed) route('/login', true);
        break;
    }
  };

  return (
    <>
      <Header />
        <Router onChange={handleRoute}>
          <Profile path="/" />
          <Music path="/music" />
          <Calendar path="/calendar" />
        </Router>
      <MenuBar />
    </>
  )
}
