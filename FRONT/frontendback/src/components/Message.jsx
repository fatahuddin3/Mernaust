const Message = ({ message, currentUser }) => {
    const isSent = message.sender === currentUser._id;
    return (
        <div className={`message ${isSent ? "sent" : "received"}`}>
            <p>{message.content}</p>
        </div>
    );
};

export default Message;