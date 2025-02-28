const express = require("express");
const router = express.Router();
const User = require("../models/userModel")
const jwt = require('jsonwebtoken');


const multer = require('multer');
const path = require('path');
const fs = require('fs');
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
           expiresIn: '300d',
    });
};

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});
const storage = multer.diskStorage({
      destination: (req, file, cb) => {
          const dir = './uploads/';
          if (!fs.existsSync(dir)) {
               fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
       filename: (req, file, cb) => {
           cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

   const upload = multer({ storage: storage });


router.post('/register', upload.single('image'), async (req, res) => {
   

    const { name, email, password, age, gender, address, contactNumber, createdAt } = req.body;

    try {
           const userexists = await User.findOne({ contactNumber });
        if (userexists) {
            return res.status(400).json({ message: 'Patient already exists' });
        }

     

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const user = await User.create({
              email,
              password,
            name,
            age,
              gender,
            address,
             contactNumber,

            createdAt,
             image: `/uploads/${req.file.filename}`,

            
        });

        if (user) {
           

            return res.status(201).json({
                 _id: user ._id,
                name: user.name,
                 contactNumber: user.contactNumber,
                   filePath: `/uploads/${req.file.filename}`,   
                token: generateToken(user._id)
            });
        } else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
          console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});


router.get('/uploads/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
      if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Image not found');
    }
});




module.exports = router