import bcryptjs from 'bcryptjs';
import Salons from './salons.model.js';

export const salonsPost = async (req, res) => {

    const {name, amount, eventType} = req.body;
    const salons = new Salons({ name, amount, eventType});

    await salons.save();

    res.status(200).json({
        salons
    });
}