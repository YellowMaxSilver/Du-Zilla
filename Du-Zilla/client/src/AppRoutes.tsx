import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importando os componentes tipados
import Home from './pages/Home/Home'; 
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import PortfolioView from './pages/PortfolioView/PortfolioView';
import PortfolioPanel from './pages/PortfolioPanel/PortfolioPanel';
import PortfolioEditor from './pages/PortfolioEditor/PortfolioEditor';

import NotFound from './pages/NotFound/NotFound'; 

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/portfolio" element={<PortfolioView />} />
        <Route path="/studio/portfolio/panel" element={<PortfolioPanel />} />
        <Route path="/studio/portfolio/editor" element={<PortfolioEditor />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;