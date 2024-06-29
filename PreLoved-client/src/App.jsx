import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/home/Home'
import Header from './components/header/Header'
import './app.css'
import Menu from './components/menu/Menu'
import { useState } from 'react'

function App() {
	const [isLogin, setIsLogin] = useState(false)
	const changeLoginStatus = () => {

	}
  return (
    <div className="">
      <Header onLogin={changeLoginStatus}/>
      <Menu />
      <Home />
    </div>
  )
}

export default App
