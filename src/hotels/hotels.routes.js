import { Router } from "express";
import { check } from "express-validator";
import {
    hotelsPost
} from "./hotels.controller.js"

const router = Router();

router.post(
    "/",
    [
        check("name", "The name is necessary"),
        check("quantityRooms", "The number of rooms is necessary"),
        check("location", "Location is mandatory"),
        check("owner", "Owner's name is required"),
    ],
    hotelsPost
)

export default router;