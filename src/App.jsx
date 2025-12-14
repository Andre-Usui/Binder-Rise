import './App.css'
import Header from './components/Header/Header.jsx'
import Body from './components/Body.jsx';
import Footer from './components/Footer/Footer.jsx';
import { DbProvider } from './DbContext.jsx'
import { DisciplinesProvider } from './DisciplinesContext.jsx'
import { AnimatePresence } from 'motion/react';


function App() {


  return (
    <DbProvider>
      <DisciplinesProvider>
        <Header
        />
        <AnimatePresence mode="sync">
          <Body />
        </AnimatePresence>
        <Footer
        />
      </DisciplinesProvider>
    </DbProvider>
  )
}

export default App
