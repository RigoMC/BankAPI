const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const historySchema = new mongoose.Schema({
    No: {
        type: Number,
        required: true
    },
    transaction: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    Balance: {
        type: Number,
        required: true
    }
}, { _id: false });

const accountSchema = new mongoose.Schema({
    Balance: {
        type: Number,
        required: true
    },
    History: [historySchema]
}, { _id: false });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    account: accountSchema // Integrar el esquema de cuenta como subdocumento
});

const User = mongoose.model('User', userSchema);

module.exports = User;
