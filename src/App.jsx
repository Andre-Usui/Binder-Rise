import './App.css'
import Feed from './components/Feed/Feed.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Landing from './components/Landing/Landing.jsx';
import { DbProvider } from './db3.jsx'
import { useState } from 'react';


function App() {
  const [discipline, setDiscipline] = useState("landing");
  const [page, setPage] = useState(1);

  return (
    <DbProvider>
      <>
        <Header
          discipline_id={discipline.discipline_id}
          discipline={discipline}
          setDiscipline={setDiscipline}
          setPage={setPage}
        />
        {discipline === "landing" ? <Landing /> :
        discipline === "null" ? null : 
        <Feed
          discipline={discipline}
          discipline_id={discipline.discipline_id}
          page={page}
          setPage={setPage}
        />}
        
        <Footer
        />
      </>
    </DbProvider>
  )
}

export default App
