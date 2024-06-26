import { useState } from 'react'
import { Login } from './components/Login';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Feedbar } from './components/Feedbar';

function App() {
  const [count, setCount] = useState(0)

  return (
		<div className="App">
			<Sidebar/>
			<Navbar/>
			<Feedbar/>
		</div>
  )
}

export default App
