const User = require('../models/User');

// Función para realizar un depósito
exports.deposit = async (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;
    
    try {
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Agregar la cantidad al balance
        user.account.Balance = parseFloat(user.account.Balance) + parseFloat(amount);

        // Generar un nuevo registro en history
        const newTransaction = {
            No: user.account.History.length + 1,
            transaction: 'Deposit',
            Amount: amount,
            Balance: user.account.Balance
        };

        user.account.History.push(newTransaction);

        await user.save();

        res.json({ message: 'Deposit successful', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Función para realizar un retiro
exports.withdrawal = async (req, res) => {
    const { userId } = req.params;
    const { amount } = req.body;
    console.log(userId)
    console.log(amount)
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verificar fondos suficientes
        if (user.account.Balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        // Restar la cantidad al balance
        user.account.Balance = parseFloat(user.account.Balance) - parseFloat(amount);

        // Generar un nuevo registro en history
        const newTransaction = {
            No: user.account.History.length + 1,
            transaction: 'Withdrawal',
            Amount: amount,
            Balance: user.account.Balance
        };

        user.account.History.push(newTransaction);

        await user.save();

        res.json({ message: 'Withdrawal successful', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
