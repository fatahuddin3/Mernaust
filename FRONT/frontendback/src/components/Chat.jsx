import { useState, useEffect, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import './Chat.css'
const socket = io("http://localhost:4000");

const Chat = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [conversations, setConversations] = useState([]);
    const [receiver, setReceiver] = useState(null);
    const [receiverName, setReceiverName] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        socket.emit("join", user._id);
        fetchConversations();
    }, [user, navigate]);

    useEffect(() => {
        socket.on("receiveMessage", (newMessage) => {
            if (newMessage.sender._id === receiver || newMessage.receiver._id === receiver) {
                setMessages((prev) => [...prev, newMessage]);
            }
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, [receiver]);


    const fetchConversations = async () => {
        try {
            const { data } = await api.get("/messages/conversations");
            setConversations(data);
        } catch (error) {
            console.error("Error fetching conversations:", error);
        }
    };


    const loadMessages = async (receiverId, name) => {
        setReceiver(receiverId);
        setReceiverName(name);
        try {
            const { data } = await api.get(`/messages/${receiverId}`);
            setMessages(data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };


    const sendMessage = async (e) => {
        e.preventDefault();
        if (!receiver || !message) return;

        try {
            const { data } = await api.post("/messages/send", { receiver, content: message });
            socket.emit("sendMessage", data);
            setMessages([...messages, data]);
            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="chat-container">
            <div className="sidebar">
                <h3>Chats</h3>
                {conversations.map((conv) => (
                    <div key={conv._id} className="conversation" onClick={() => loadMessages(conv._id, conv.name)}>
                        <p>{conv.name}</p>
                    </div>
                ))}
            </div>

            <div className="chat-box">
                {receiver ? (
                    <>
                        <h3>Chat with {receiverName}</h3>
                        <div className="messages">
                            {messages.map((msg) => (
                                <div key={msg._id} className={`message ${msg.sender._id === user._id ? "sent" : "received"}`}>
                                    <strong>{msg.sender.name}:</strong>
                                    <p>{msg.content}</p>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={sendMessage}>
                            <input type="text" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} required />
                            <button type="submit">Send</button>
                        </form>
                    </>
                ) : (
                    <p>Select a conversation to start chatting</p>
                )}
            </div>
        </div>
    );
};

export default Chat;