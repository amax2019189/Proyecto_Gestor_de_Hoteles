import roomModel from "../rooms/room.model.js";
import salonsModel from "../salons/salons.model.js";

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
