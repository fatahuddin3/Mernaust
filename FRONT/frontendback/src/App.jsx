<<<<<<< HEAD

=======
>>>>>>> 666167b6330e9bfa2ee3af8f89961c98d8b3b4f7
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
<<<<<<< HEAD
import Car from './components/Car';
import Carimages from './components/Carimage';
import Caredit from './components/Caredit';
import './App.css';

function App() {
    return (
        <Router>
            <div className="container">
                <header className="header">
                    <h1>Welcome</h1>
                    <nav className="navbar">
                        <Link to="/" className="nav-link">Landing</Link>
                        <Link to="/reg" className="nav-link">Register</Link>
                        <Link to="/log" className="nav-link">login</Link>
                        <Link to="/car" className="nav-link">car</Link>
                        <Link to="/carima" className="nav-link">carimage</Link>
                        <Link to="/caredi" className="nav-link">caredit</Link>
                    </nav>
                </header>

                <main className="main-content">
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
=======
import './App.css';
import logo from './rental.png';
function App() {
    return (
        <Router>
         <div className="container">
                <header className="head">
                         <h1>Welcome</h1>
                    <nav className="navb">
                        <Link to="/" className="navlink">Landing</Link>
                            <Link to="/reg" className="navlink">Register</Link>
                        <Link to="/log" className="navlink">login</Link>
                    </nav>
            </header>

                <main className="maincontent">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                      <Route path="/reg" element={<Register />} />
                           <Route path="/log" element={<Login />} />
                       
                    </Routes>
                    </main>

             <footer className="foot">
                    <p>123,katasur,kaderbad Housing,Mohammadpur,Dhaka-1207</p>
                </footer>
              </div>
      </Router>
>>>>>>> 666167b6330e9bfa2ee3af8f89961c98d8b3b4f7
    );
}

function Landing() {
    return (
        <section id="landing" className="landing">
<<<<<<< HEAD
            <h2>Fata</h2>
=======
          
            <strong> <h1>WELCOME TO OUR GARI VARA</h1></strong>
            <p>Gari Vara has received its share of challenges and complaints over the years.
                </p>
            <img src={logo} alt="Login Logo" className="loginimage" /> 
>>>>>>> 666167b6330e9bfa2ee3af8f89961c98d8b3b4f7
        </section>
    );
}

export default App;