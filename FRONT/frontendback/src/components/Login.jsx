
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const validform = () => {
        if (!email || !password) {
            alert("Please fill up every box.");
            return false;
        }
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailReg.test(email)) {
            alert("Invalid email format.");
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validform()) return;

        try {
            await login(email, password);
            navigate("/chat");
        } catch (error) {
            console.error("Login Failed:", error);
            alert("Invalid email or password");
        }
    };

    return (
        <div className="contain">
            <form onSubmit={handleLogin}>
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
                    Not registered yet?{" "}
                    <button onClick={() => navigate("/reg")} className="button">
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
