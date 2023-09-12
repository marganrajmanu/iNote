import React, { useState } from 'react'
import Home from './components/Home';
import About from "./components/About";
import Login from './components/Login'
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import Signup from './components/Signup'
import AddNote from './components/AddNote';
import UpdateNote from './components/UpdateNote';
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import User from './components/User';


const App = () => {

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route exact path='/home' element={<Home showAlert={showAlert} />} />
            <Route exact path='/' element={<About />} />
            <Route exact path='/home/addnote' element={<AddNote showAlert={showAlert} />} />
            <Route exact path='/home/updatenote' element={<UpdateNote showAlert={showAlert} />} />
            <Route exact path='/login' element={<Login showAlert={showAlert} />} />
            <Route exact path='/signup' element={<Signup showAlert={showAlert} />} />
            <Route exact path='/user' element={<User showAlert={showAlert} />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  )
}

export default App