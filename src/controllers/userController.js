const md5 = require('js-md5');
const User = require('../models/User');
const accountController = require('./accountController');
const historyController = require('./historyController');

// Function to create a user
const createUser = async (req, res) => {
    const { name, email, password, account } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password using MD5
        const hashedPassword = md5(password);
        user = new User({
            name,
            email,
            password: hashedPassword,
            account
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to search for a user by name and password
const findUserByNameAndPassword = async (req, res) => {
    const { name, password } = req.body;

    try {
        // Find user by name
        let user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({ message: 'The user not exist' });
        }

        // Compare hashed passwords
        const hashedPassword = md5(password);
        if (hashedPassword !== user.password) {
            return res.status(400).json({ message: 'Invalid name or password' });
        }
        
        // Respond with only the _id field
        res.json({ _id: user._id, name: user.name, balance: user.account.Balance, history: user.account.History });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    ...accountController,
    ...historyController,
    createUser,
    getUsers,
    findUserByNameAndPassword
};
