import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import {  Register } from "./pages/Register";
import { Header } from "./components/Header"
import { Login } from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/userSlice";
import axios from 'axios'

function App() {
  const dispatch = useDispatch()
  //get the user from state
  let user = useSelector(state=>state.user.user)
    if(!user){
      // if it doesnt exist check localstorage for a token 
      if(localStorage.getItem('token')){
        //if there is a token, the user will be loaded, if not it will remain false enabling redirection
        const token = localStorage.getItem('token')
        const extractedID = token[token.length - 2];
        axios.get(`https://reqres.in/api/users/${extractedID}`)
        .then(response=>{
            dispatch(setUser(response.data.data))
        })
        .catch(err=>{
            console.log(err)
        })
      }
    }
  return (
    <div className="App">
        <BrowserRouter>
        <Header />  
          <Routes>
            <Route path="/" element={user ? <Home/> : <Navigate to='/login'/>}/>
            <Route path="/register" element={user ? <Navigate to='/'/> : <Register/>}/>
            <Route path="/login" element={user ? <Navigate to='/'/> : <Login/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
