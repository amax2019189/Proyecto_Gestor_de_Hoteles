import roomModel from "../rooms/room.model.js";
import salonsModel from "../salons/salons.model.js";
import User from "./user.model.js";

export const getRoomsAndSalons = async (req, res) => {
  try {
    const { fechaHospedaje, personas } = req.body;

    // Obtener todas las habitaciones y salones
    const rooms = await roomModel.find();
    const salons = await salonsModel.find();

    const habitacionesDisponibles = rooms.filter((habitacion) => {
      return (
        habitacion.availability === "available" &&
        habitacion.capacity >= personas &&
        new Date(fechaHospedaje) >= habitacion.dateStart &&
        new Date(fechaHospedaje) <= habitacion.dateEnd
      );
    });

    const salonesDisponibles = salons.filter((salon) => {
      return salon.stateSalon === true || false && salon.amount >= personas;
    });

    const respuesta = {
      habitaciones: habitacionesDisponibles,
      salones: salonesDisponibles,
    };

    res.status(200).json(respuesta);
  } catch (error) {
    console.log("Error al obtener los datos: ", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.user.uid;
  const { email, username, password } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { email, username, password }, { new: true });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.status(200).json({
        msg: "Your account has been updated",
        user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.user.uid;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'UYour account has been deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};