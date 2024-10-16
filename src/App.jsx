import Dashboard from "./components/DashBoard/Dashboard"
import Hompage from "./components/Hompage"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import {createContext, useEffect, useState } from "react"
import { auth } from "./firebase"
import Accounts from "./components/DashBoard/Accounts"
import Modal from "./components/DashBoard/Modal"
export const UserContext = createContext();

function App() {

  const [userName, setUserName] = useState("")

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      // console.log(user)
      if(user){
        setUserName(user.displayName);
        console.log(user)
      }else setUserName("");
    })
  },[])


  return (
    <>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={<Login />} 
          />
          <Route 
            path="/signup" 
            element={<SignUp />} 
          />
          <Route 
            path="/homepage"
            element={<Hompage name={userName} /> }
          />
          <Route 
            path="/dashboard" 
            element={<Dashboard name={(userName)} />} 
          />
          <Route 
            path="/accounts"
            element={<Accounts />}
          />
          <Route 
            path="/modal"
            element={<Modal />}
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
