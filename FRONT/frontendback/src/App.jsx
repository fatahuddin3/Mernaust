
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Car from './components/Car';
import Carimages from './components/Carimage';
import Caredit from './components/Caredit';
import logo from './rental.png'; 
import './App.css';

function App() {
    return (
        <Router>
               <div className="container">
                 <header className="head">
                        <h1>Welcome</h1>
                   <nav className="navb">
                        <Link to="/" className="navlink">Landing</Link>
                           <Link to="/reg" className="navlink">Register</Link>
                         <Link to="/log" className="navlink">Login</Link>
                        <Link to="/car" className="navlink">Car</Link>
                           <Link to="/carima" className="navlink">Car Image</Link>
                        <Link to="/caredi" className="navlink">Car Edit</Link>
                    </nav>
                </header>

              <main className="maincontent">
                    <Routes>
                             <Route path="/" element={<Landing />} />
                        <Route path="/reg" element={<Register />} />
                        <Route path="/log" element={<Login />} />
                          <Route path="/car" element={<Car />} />
                      <Route path="/carima" element={<Carimages />} />
                        <Route path="/caredi" element={<Caredit />} />
                         <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                   </main>
            </div>
           </Router>
    );
}

function Landing() {
    return (
        <section id="landing" className="landing">
        
              <strong><h1>WELCOME TO OUR GARI VARA</h1></strong>
                 <p>Gari Vara has received its share of challenges and complaints over the years.</p>
            <img src={logo} alt="Login Logo" className="loginimage" />
        </section>
    );
}

export default App;
