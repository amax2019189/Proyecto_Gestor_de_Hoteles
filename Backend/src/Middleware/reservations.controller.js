import Reservation from './reservation.model.js';

export const getRecentReservations = async (req, res) => {
  try {
    const userId = req.params.userId;
    const reservations = await Reservation.find({ user: userId })
      .populate('user', 'name email')
      .populate('hotel', 'name location')
      .populate('room', 'roomName roomNumber')
      .populate('services')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};