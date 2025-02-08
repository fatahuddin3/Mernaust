
const express = require('express');


const log = require('./middlewares/logger');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('dotenv').config({path:'./config.env' });

const app = express();




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







  app.listen(PORT, () => {
         console.log(`Server running on port ${PORT}`);
});


