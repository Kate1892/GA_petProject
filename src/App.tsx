import React from 'react'
import { Routes, Route } from 'react-router-dom'
import styles from './App.module.scss'

import MainLayout from './MainLayout'
import Main from './Pages/Main/Main'

const Novinki = React.lazy(
  () => import(/*webpackChunkName: "Novinki"*/ './Pages/Novinki/Novinki')
)
const FullProductInfo = React.lazy(
  () =>
    import(
      /*webpackChunkName: "FullProductInfo"*/ './Pages/FullProductInfo/FullProductInfo'
    )
)

function App() {
  return (
    <>
      <div className={styles}>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route path='' element={<Main />} />

            <Route
              path='novinki'
              element={
                <React.Suspense fallback={<div></div>}>
                  <Novinki />
                </React.Suspense>
              }
            />
            <Route
              path=':id'
              element={
                <React.Suspense fallback={<div></div>}>
                  <FullProductInfo />
                </React.Suspense>
              }
            />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
