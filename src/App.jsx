import Dashboard from "./components/DashBoard/Dashboard"
import Hompage from "./components/Hompage"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import { useEffect, useState } from "react"
import { auth } from "./firebase"


function App() {

  const [userName, setUserName] = useState("")

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      // console.log(user)
      if(user){
        setUserName(user.displayName);
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
            element={<Hompage /> }
          />
          <Route 
            path="/dashboard" 
            element={<Dashboard name={userName} />} 
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
