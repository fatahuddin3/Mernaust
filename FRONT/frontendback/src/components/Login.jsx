import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { loginuser } from '../services/Service';
=======
     import './Login.css';
>>>>>>> 666167b6330e9bfa2ee3af8f89961c98d8b3b4f7

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

<<<<<<< HEAD
        const formData = { email, password };
=======
        try {
            navigate('/reg');
>>>>>>> 666167b6330e9bfa2ee3af8f89961c98d8b3b4f7

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
<<<<<<< HEAD

=======
                
>>>>>>> 666167b6330e9bfa2ee3af8f89961c98d8b3b4f7
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
<<<<<<< HEAD
                    <button onClick={() => navigate('/reg')} className="button">
=======
                        <button onClick={() => navigate('/reg')} className="button">
>>>>>>> 666167b6330e9bfa2ee3af8f89961c98d8b3b4f7
                        Register

                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;