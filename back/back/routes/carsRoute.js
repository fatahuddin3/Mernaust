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
router.get("/getallcars", async (req, res) => {
    try {
        const cars = await Cars.find();
        res.send(cars);
    } catch (error) {
        return res.status(400).json(error);
    }
});
router.get("/images", async (req, res) => {
    try {
        const { fueltype } = req.query;

        let query = {};
        if (fueltype) {
            query.fueltype = fueltype;
        }

        const cars = await Cars.find(query, "image name fueltype rentperhour capacity");

        if (!cars.length) {
            return res.status(404).json({ error: `No cars found for ${fueltype}` });
        }

        res.status(200).json(cars);
    } catch (error) {
        console.error("Error fetching cars:", error);
        res.status(500).json({ error: "Server error fetching car data" });
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

router.put('/:id', upload.single('image'), async (req, res) => {

    try {
        const car = await Cars.findOne({ _id: req.params.id });
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        const { name, fueltype, capacity, rentperhour } = req.body;

        car.name = name || car.name;
        car.fueltype = fueltype || car.fueltype;
        car.capacity = capacity || car.capacity;
        car.rentperhour = rentperhour || car.rentperhour;

        if (req.file) {
            const oldImagePath = car.image;
            if (oldImagePath && fs.existsSync(path.join(__dirname, oldImagePath))) {
                fs.unlinkSync(path.join(__dirname, oldImagePath));
            }
            car.image = `/uploads/${req.file.filename}`;
        }

        await car.save();

        return res.status(200).json({
            message: 'Car updated successfully',
            car: {
                _id: car._id,
                name: car.name,
                fueltype: car.fueltype,
                rentperhour: car.rentperhour,
                capacity: car.capacity,
                image: car.image,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/deletecar/:id', async (req, res) => {
    try {




        const car = await Patient.findByIdAndDelete(req.params.id);

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        if (car.image && fs.existsSync(car.image)) {
            fs.unlinkSync(car.image);
        }

        return res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error });
    }
});


module.exports = router;