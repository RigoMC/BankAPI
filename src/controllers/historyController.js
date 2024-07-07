const User = require('../models/User');

// Función para obtener el historial de transacciones de un usuario
exports.getHistory = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const history = user.account.History;

        res.json(history);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
