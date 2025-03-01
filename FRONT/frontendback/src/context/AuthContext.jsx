import { createContext, useState, useEffect } from "react";
import api from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedUser = localStorage.getItem("user");
        if (loggedUser) {
            setUser(JSON.parse(loggedUser));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post("/userrr/login", { email, password });
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("token", data.token);
        } catch (error) {
            throw new Error("Login failed");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};