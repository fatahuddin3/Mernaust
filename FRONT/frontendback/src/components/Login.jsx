import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
     import './Login.css';
import logo from '../rent.png'; 
const Login = () => {
    const [email, setEmail] = useState('');
         const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const validform = () => {

        if (!email || !pass) {
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

        try {
            navigate('/s');

        } catch (error) {
            alert(`Login error: ${error.message}`);
        }
    };

    return (
        <div className="contain">
                 <img src={logo} alt="Login Logo" className="login-image" /> 
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
                            value={pass}

                        onChange={(e) => setPass(e.target.value)}

                        className="input"
                    />
                      </div>
                <button type="submit" className="button">Login</button>
                    </form>
            <div className="regist">
                <p>

                    Not registered yet?{' '}
                        <button onClick={() => navigate('/register')} className="button">
                        Register

                            </button>
                </p>
            </div>
        </div>
    );
};

export default Login;

