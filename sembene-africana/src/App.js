import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sembene from './pages/Sembene';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Player from './pages/Player';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Sembene />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='player' element={<Player />} />
        <Route exact path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


