import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importando os componentes tipados
import Home from './pages/Home/Home'; 
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
// import Sobre from './Sobre';
import NotFound from './pages/NotFound/NotFound'; 

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/sobre" element={<Sobre />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;