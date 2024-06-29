import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/home/Home'
import Header from './components/header/Header'
import './app.css'
import Menu from './components/menu/Menu'

function App() {
  return (
    <div className="">
      <Header />
      <Menu />
      <Home />
    </div>
  )
}

export default App
