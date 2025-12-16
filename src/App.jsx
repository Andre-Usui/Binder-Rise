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
        <div className="h-full w-screen m-0 p-0 bg-main-2 box-border overflow-x-hidden font-1">
          <Header
          />
          <AnimatePresence mode="sync">
            <Body />
          </AnimatePresence>
          <Footer
          />
        </div>
      </DisciplinesProvider>
    </DbProvider>
  )
}

export default App
