
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
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
    );
}

function Landing() {
    return (
        <section id="landing" className="landing">
            <h2>Fata</h2>
        </section>
    );
}

export default App;