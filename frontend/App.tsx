import './App.css'

import LoginModal from './components/login'
import Header from './components/Header'

function App () {
  return (
    <div className = "flex flex-col justify-start content-center p-7">
      <div className="mb-4 self-center">
        <p className="text-3xl font-bold underline">This is the start of something beautiful</p>
        <img className="transition-opacity duration-1000" src='https://static.wikia.nocookie.net/terminator/images/3/30/T2jd-t1000-film-5.jpg/' width="550"/>
      </div>
      <LoginModal />

    </div>
  )
}

export default App
