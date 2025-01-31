
// src/App.js main code
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    return (

        <Router>
            <div className="App">

                <Routes>



                


                    <Route path="/log" element={<Login />} />
                    <Route path="/" element={<Register />} />
                </Routes>
            </div>
        </Router>

    );
}
export default App;