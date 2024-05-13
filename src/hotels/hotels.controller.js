import Hotels from "./hotels.model.js";
import Reservations from "./reservation.model.js";

export const hotelsPost = async (req, res) => {
  const { name, quantityRooms, location, owner } = req.body;
  const hotels = new Hotels({ name, quantityRooms, location, owner });

  await hotels.save();

  res.status(200).json({
    msg: "|-- Hotel Agregado --|",
    hotels,
  });
};

export const createReservation = async (req, res) => {
  const { hotelId, checkInDate, checkOutDate, guestName } = req.body;

  try {
    // Aquí se usa el modelo Hotel para encontrar el hotel por ID
    const hotel = await Hotels.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ msg: "Hotel not found" });
    }

    const newReservation = new Reservations({
      hotelId,
      checkInDate,
      checkOutDate,
      guestName,
    });

    await newReservation.save();
    res.status(201).json({
      msg: "Reservation successfully created",
      reservation: newReservation,
    });
  } catch (error) {
    console.error("Error when creating reservation: ", error);
    res.status(500).json({ error: error.message });
  }
};

export const getHotelStatistics = async (req, res) => {
  const { hotelId } = req.params; // Suponiendo que el ID del hotel viene como parámetro

  // Verificar si el hotel existe
  const hotel = await Hotels.findById(hotelId);
  if (!hotel) {
    return res.status(404).json({ msg: "Hotel not found" });
  }

  try {
    const reservations = await Reservations.find({ hotelId }).lean();
    const totalReservations = reservations.length;

    const occupiedNights = reservations.reduce((acc, curr) => {
      const checkIn = new Date(curr.checkInDate);
      const checkOut = new Date(curr.checkOutDate);
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return acc + diffDays;
    }, 0);

    const totalRoomNights = hotel.quantityRooms * 365; // Asumiendo que calculamos para un año
    const occupancyRate = (occupiedNights / totalRoomNights) * 100;

    res.status(200).json({
      hotelName: hotel.name,
      totalReservations,
      occupancyRate: occupancyRate.toFixed(2),
      totalOccupiedNights: occupiedNights,
    });
  } catch (error) {
    console.error("Error when getting hotel statistics: ", error);
    res.status(500).json({ error: error.message });
  }
};


export const generateInvoice = async (req, res) => {
  const { userId, hotelId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const hotel = await Hotels.findById(hotelId);
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

// Validacion de busqueda de hoteles por region

export const searchHotels = async (req, res) => {
  try {
    const { region, searchTerm } = req.body;

    let query = {};
    if (region) {
      query.location = region;
    }
    if (searchTerm) {
      query.name = { $regex: searchTerm, $options: "i" };
    }

    const hotels = await Hotels.find(query).exec();

    res.status(200).json({ 
     
msg: "|-- Hoteles Encontrados --|",
      hotels,
    });
  } catch (error) {
    console.error("Error al buscar hoteles:", error);
    res.status(500).json({
      error:
        "Error al buscar hoteles. Por favor, inténtelo de nuevo más tarde.",
    });
  }
};
//aca termina esta validacion


// Validacion de buscar por hotel las reservas del mismo

export const reservationsbyhotel = async (req, res) => {
  const { hotelId } = req.params; 
  try {
    
    const reservations = await Reservations.find({ hotelId }).lean();

    res.status(200).json({
      msg: "All reservations retrieved successfully",
      reservations,
    });
  } catch (error) {
    console.error("Error when getting reservations: ", error);
    res.status(500).json({ error: error.message });
  }
};
//aca termina esta validación