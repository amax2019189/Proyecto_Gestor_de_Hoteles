import { request, response } from "express";
import Room from "./room.model.js";

export const roomsPost = async (req, res) => {
    const {
        roomName,
        roomNumber,
        hotel,
        availability,
        type,
        capacity,
        description,
        datesAvailable
    } = req.body;

    try{
        const rooms = new Room({
            roomName,
            roomNumber,
            hotel,
            availability,
            type,
            capacity,
            description,
            datesAvailable
        })
    
        await rooms.save();
        res.status(200).json({
            msg: 'Room successfully added ', 
            rooms
        });
        
    }catch(error) {
        console.error('ERROR when adding the room'. error)
        res.status(400).json({error: error.message})
    };
}

export const getRooms = async (req, res) => {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (error) {
      console.error("ERROR: when obtaining rooms ", error);
      res.status(500).json({ error: "ERROR: internal server" });
    }
  };
  
  export const updateRoom = async (req, res) => {
    const { id } = req.params;
    const {
      _id,
      roomName,
      ...resto
    } = req.body;
  
    try {
       
      const room = await Room.findById(id);
  
      if (!room) {
        return res.status(404).json({ msg: "Room not found" });
      }
  
      await Room.findByIdAndUpdate(id, resto);
      const roomm = await Room.findOne({ _id: id });

      res.status(200).json({ msg: "Room successfully updated", roomm });

    } catch (error) {
      console.error("ERROR updating the room: ", error);
      res.status(400).json({ error: error.message });
    }
  };
  
  export const deleteRoom = async (req, res) => {
    const { id } = req.params;
  
    try {
      const room = await Room.findById(id);
  
      if (!room) {
        return res.status(404).json({ msg: "Room not found" });
      }
  
      res.status(200).json({ msg: "Room successfully eliminated" });
    } catch (error) {
      console.error("Error deleting room: ", error);
      res.status(400).json({ error: error.message });
    }
  };