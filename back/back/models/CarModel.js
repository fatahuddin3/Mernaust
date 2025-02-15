
const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({

    name: { type: String, },
    image: { type: String },
    capacity: { type: Number },
    fueltype: { type: String },


    rentperhour: { type: Number }


}, { timestamps: true }

)
const carModel = mongoose.model('cars', carSchema)
module.exports = carModel