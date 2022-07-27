import './app.css'
import Router, { route } from 'preact-router'
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Music from './pages/Music';
import Header from './components/Header'
import MenuBar from './components/MenuBar'

export function App() {
  const isAuthenticated = () =>{
    return true;
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
