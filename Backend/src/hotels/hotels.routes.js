import { Router } from "express";
import { check } from "express-validator";
import {
    hotelsPost, generateInvoice
} from "./hotels.controller.js"

const router = Router();

router.post(
    "/createHotel",
    [
        check("name", "The name is necessary"),
        check("quantityRooms", "The number of rooms is necessary"),
        check("location", "Location is mandatory"),
        check("owner", "Owner's name is required"),
    ],
    hotelsPost
)

router.get(
    "/:userId/:hotelId/factura", 
    generateInvoice
)

export default router;