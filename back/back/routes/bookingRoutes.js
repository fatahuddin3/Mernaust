const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel');
const Car = require('../models/carModel');
const { protect } = require('../middlewares/authMiddleware');

router.post('/bookcar', protect , async (req, res) => {
    try {
        const { carId } = req.body;
          const userId = req.user.id; 

        
         const car = await Car.findById(carId);
        if (!car || car.isBooked) {
              return res.status(400).json({ message: "Car is already booked or doesn't exist." });
        }

          const booking = new Booking({
           car: carId,
             user: userId,
           status: 'Booked'
        });
        await booking.save();

      
          car.isBooked = true;
        await car.save();

        res.status(200).json({ message: "Car booked successfully!" });
    } catch (error) {
          res.status(500).json({ message: "Server error while booking car." });
    }
});

router.get('/userbookings', protect , async (req, res) => {
      try {
           const bookings = await Booking.find({ user: req.user.id }).populate('car');
       res.status(200).json(bookings);
    } catch (error) {
          res.status(500).json({ message: "Server error fetching bookings." });
    }
});

module.exports = router;
