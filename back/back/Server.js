
const express = require('express');


const log = require('./middlewares/logger');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const messageRoutes = require('./routes/messageRoutes');
const users = require('./routes/usersRoute');
const carroutes = require('./routes/carsRoute');
require('dotenv').config({path:'./config.env' });
const bookroutes = require('./routes/bookingRoutes');
const app = express();

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173"} });

  io.on("connection", (socket) => {
    socket.on("join", (userId) => {
        socket.join(userId);
    });

    socket.on("sendMessage", (message) => {
        io.to(message.receiver).emit("receiveMessage", message);
    });
});


   mongoose.connect(process.env.MONGO_URI)
 .then(() => console.log('Database done'))
    .catch((err) => console.log('Error:', err));


    app.use(cors());

app.use(cors({
    origin: 'http://localhost:5173',
           methods:['GET', 'POST','PUT','DELETE'],
   allowedHeaders:['Content-Type','Authorization'],
     credentials:true
}));

const PORT=process.env.PORT||4000;

      app.use(express.json());
app.use(log);


    app.get('/',(req, res) => {
       res.status(200).json({message:'fatah' });
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/userrr', users);
app.use('/cars', carroutes);
app.use('/messages', messageRoutes);
app.use('/bookings', bookroutes);



  app.listen(PORT, () => {
         console.log(`Server running on port ${PORT}`);
});



