import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Publications from './pages/Publications';
import Achievements from './pages/Achievements';
import Journey from './pages/Journey';
import MyShow from './pages/MyShow';
import Blog from './pages/Blog';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="publications" element={<Publications />} />
          <Route path="achievements" element={<Achievements />} />
          {/* <Route path="journey" element={<Journey />} />
          <Route path="myshow" element={<MyShow />} />
          <Route path="blog" element={<Blog />} /> */}
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
