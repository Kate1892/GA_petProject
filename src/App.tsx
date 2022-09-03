import { Routes, Route } from 'react-router-dom'
import styles from './App.module.scss'

import MainLayout from './MainLayout'
import FullProductInfo from './Pages/FullProductInfo/FullProductInfo'
import Main from './Pages/Main/Main'
import Novinki from './Pages/Novinki/Novinki'

function App() {
  return (
    <>
      <div className={styles}>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route path='' element={<Main />} />
            <Route path='novinki' element={<Novinki />} />
            <Route path=':id' element={<FullProductInfo />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
