import Hotels from "./hotels.model.js";
import User from "../users/user.model.js";

export const hotelsPost = async (req, res) => {
  const { name, quantityRooms, location, owner } = req.body;
  const hotels = new Hotels({ name, quantityRooms, location, owner });

  await hotels.save();

  res.status(200).json({
    msg: "|-- Hotel Agregado --|",
    hotels,
  });
};

export const generateInvoice = async (req, res) => {
  const { userId, hotelId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ msg: "Hotel not found" });
    }

    const cargosAdicionales = [
      { descripcion: "Servicio de minibar", precio: 20 },
      { descripcion: "Servicio de lavandería", precio: 30 },
    ];

    const totalCargosAdicionales = cargosAdicionales.reduce(
      (total, cargo) => total + cargo.precio,
      0
    );
    const total = totalCargosAdicionales + hotel.precioBase;

    const factura = {
      usuario: user,
      hotel: hotel,
      cargosAdicionales: cargosAdicionales,
      total: total,
    };

    res.json(factura);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

/* Subiendo funsion de busqueda de regiones */
export const hotelsSearch = async (req, res) => {
  try {
    const { region, searchTerm } = req.query;

    let query = {};
    if (region) {
      query.location = region;
    }
    if (searchTerm) {
      query.name = { $regex: searchTerm, $options: "i" };
    }

    const hotels = await Hotels.find(query);

    res.status(200).json({
      msg: "|-- Hoteles Encontrados --|",
      hotels,
    });
  } catch (e) {
    console.error("Error al buscar hoteles:", error);
    res.status(500).json({
      error:
        "Error al buscar hoteles. Por favor, inténtelo de nuevo más tarde.",
    });
  }
};
/*Aca termina mi funsion*/
