import roomModel from "../rooms/room.model.js";
import salonsModel from "../salons/salons.model.js";

export const getRoomsAndSalons = async (req, res) => {
  try {
    const rooms = await roomModel.find();
    const salons = await salonsModel.find();

    res.status(200).json(rooms, salons);
  } catch (error) {
    console.log("error when obtaining the data: ", error);
    res.status(500).json({ error: "error interno del server" });
  }
};
