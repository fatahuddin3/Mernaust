const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const users = new mongoose.Schema({

       name: String,
    age: Number,
      gender: String,
   address: String,
    contactNumber: String,
   email: String,
    password: String,

    image: String,

    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
    users.methods.matchPassword = async function (enteredpass) {
    return await bcrypt.compare(enteredpass, this.password);
};
users.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
       const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
     next();
});
module.exports = mongoose.model('user', users); 