import Hotels from './hotels.model.js';

export const hotelsPost = async (req, res) => {
    const {name, quantityRooms, location, owner} = req.body;
    const hotels = new Hotels({name, quantityRooms, location, owner});
    
    await hotels.save();

    res.status(200).json({
        msg: "|-- Hotel Agregado --|",
        hotels
    });
}