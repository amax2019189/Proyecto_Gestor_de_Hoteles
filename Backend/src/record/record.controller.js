import Reservation from './reservation.model.js';

const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('roomId')
      .populate('userId');
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las reservas' });
  }
};

export default { getReservations };