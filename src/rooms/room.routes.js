import { Router } from "express";
import { check } from "express-validator";
import { 
    roomsPost, 
    getRooms, 
    updateRoom, 
    deleteRoom } from "./room.controller.js";

const room = Router();

room.post('/createRoom', roomsPost);

room.get('/', getRooms);

room.put('/updateRoom/:id', updateRoom);

room.delete('/deleteRoom/:id', deleteRoom)

export default room;