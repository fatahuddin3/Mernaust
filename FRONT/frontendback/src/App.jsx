
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Chat from "./components/Chat";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import Carimage from "./components/Carimage";
import './App.css';
import Caredit from './components/Caredit';
import Car from './components/Car';
import rental from "./rental.png";

function ProtectedRoute({ children }) {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="container">
                    <header className="head">
                        <h1>Welcome</h1>
                        <nav className="navb">
                          

                            <Link to="/" className="navlink">Landing</Link>
                            <Link to="/reg" className="navlink">Register</Link>
                            <Link to="/login" className="navlink">Login</Link>
                            <Link to="/chat" className="navlink">ChatBox</Link>
                            <Link to="/image" className="navlink">Carimage</Link>

                            <Link to="/car" className="navlink">car</Link>

                            <Link to="/caredi" className="navlink">caredit</Link>

                        </nav>
                    </header>

                    <main className="maincontent">
                        <Routes>
                            <Route path="/reg" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
                            <Route path="/image" element={<Carimage />} />


                            <Route path="/" element={<Landing />} />

                            <Route path="/car" element={<Car />} />

                            <Route path="/caredi" element={<Caredit />} />
                            <Route path="*" element={<Navigate to="/login" replace />} />

                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
}

function Landing() {
    return (
        <section id="landing" className="landing">
            <h2>Welcome to our GariVara </h2>
            <img src={rental} alt="Rental Car" className="landing-image" />

        </section>
    );
}
export default App;