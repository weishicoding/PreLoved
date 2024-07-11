import Header from "./components/header/Header";
import Menu from "./components/menu/Menu";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import RequiredAuth from "./components/RequiredAuth";
import AuthRedireact from "./components/AuthRedireact";
import PersistLogin from "./components/PersistLogin";
import { Register } from "./components/login/Register";
import Home from "./pages/Home";
import "./App.css";
import "./styles/style.css";

function App() {
  return (
    <div className="">
      <Header />
      <Menu />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route element={<PersistLogin />}>
          <Route
            path="/login"
            element={
              <AuthRedireact>
                <Login />
              </AuthRedireact>
            }
          ></Route>
        </Route>
        <Route path="/register" element={<Register />}></Route>
        <Route element={<RequiredAuth />}> </Route>
      </Routes>
    </div>
  );
}

export default App;
