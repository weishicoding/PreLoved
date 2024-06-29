import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/home/Home'
import Header from './components/header/Header'
import './app.css'
import Menu from './components/menu/Menu'
import {useState} from 'react'

function App() {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('accessToken'))
  const changeLoginStatus = value => {
    if (value == 'home') {
      console.log(value)
    }
    if (value == 'login') {
      console.log(value)
    }
  }
  return (
    <div className="">
      <Header isLogin={isLogin} onLogin={changeLoginStatus} />
      <Menu />
      <Home />
    </div>
  )
}

export default App
