import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Router, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/home';
import HashPage from './pages/hash';
import Block from './pages/block';
import Blockchain from './pages/block';
import Distributed from './pages/transaction';
import Tokens from './pages/blockchain';
import Test from './pages/test';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hash' element={<HashPage />} />
        <Route path='/block' element={<Blockchain />} />
        <Route path='/transaction' element={<Distributed />} />
        <Route path='/blockchain' element={<Tokens />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
