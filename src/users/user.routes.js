import { Router } from "express";
import { check } from "express-validator";
import { getRoomsAndSalons } from "./user.controller.js";
const routerUser = Router();

routerUser.get("/roomsAndSalons", getRoomsAndSalons);


export default routerUser;