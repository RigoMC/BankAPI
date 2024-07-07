const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.post('/users/:userId/deposit', userController.deposit);
router.post('/users/:userId/withdrawal', userController.withdrawal);
router.get('/users/:userId/history', userController.getHistory);
router.post('/users/login', userController.findUserByNameAndPassword);

module.exports = router;
