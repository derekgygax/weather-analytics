// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { Header } from "./components/header/Header"
import { HomePage } from "./components/homePage/HomePage"


// TODO HOW TO IMPORT API_KEY
// const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const App = () => {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <HomePage />
    </>
  )
}
