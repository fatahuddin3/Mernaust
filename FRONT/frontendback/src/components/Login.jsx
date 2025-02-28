import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginuser } from '../services/Service';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const navigate = useNavigate();

    const validform = () => {
        if (!email || !password) {
            alert('Please fill up every box.');
            return false;
        }
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailReg.test(email)) {
            alert('Invalid email format.');
            return false;
        }
        return true;
    };

    const handsubmit = async (e) => {
        e.preventDefault();
        if (!validform()) return;

        const formData = { email, password };

        try {
            const response = await loginuser(formData);
            if (response) {
                navigate('/reg');
            } else {
                alert('Login failed. Please try again.');
            }
        } catch (error) {
            alert(`Login error: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="contain">
            <form onSubmit={handsubmit}>
                <div className="inputgroup">
                    <label className="lab">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                    />
                </div>
                <div className="inputgroup">
                    <label className="lab">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPass(e.target.value)}
                        className="input"
                    />
                </div>
                <button type="submit" className="button">Login</button>
            </form>
            <div className="regist">
                <p>
                    Not registered yet?{' '}
                    <button onClick={() => navigate('/reg')} className="button">
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;