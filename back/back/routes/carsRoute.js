const express = require("express");
const router = express.Router();
const Cars = require("../models/carModel");

const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '250d',
    });
};

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

router.get('/uploads/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Image not found');
    }
});






router.post('/car', upload.single('image'), async (req, res) => {


    const { name, fueltype, capacity, rentperhour } = req.body;

    try {




        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const car = await Cars.create({

            name, fueltype, capacity, rentperhour,

            image: `/uploads/${req.file.filename}`,


        });

        if (car) {


            return res.status(201).json({
                _id: car._id,
                name: car.name,
                fueltype: car.fueltype,
                capacity: car.capacity,
                rentperhour: car.rentperhour,
                filePath: `/uploads/${req.file.filename}`,
                token: generateToken(car._id)
            });
        } else {
            return res.status(400).json({ message: 'Invalid patient data' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;