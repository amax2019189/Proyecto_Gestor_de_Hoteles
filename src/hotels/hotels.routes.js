import { Router } from "express";
import { check } from "express-validator";
import {
    hotelsPost,
    createReservation,
    getHotelStatistics
} from "./hotels.controller.js";
const router = Router();

router.post(
    "/createHotel",
    [
        check("name", "The name is necessary").not().isEmpty(),
        check("quantityRooms", "The number of rooms is necessary").isNumeric(),
        check("location", "Location is mandatory").not().isEmpty(),
        check("owner", "Owner's name is required").not().isEmpty()
    ],
    hotelsPost
);
router.post(
    "/createReservation",
    [
        check("hotelId", "Hotel ID is required").isMongoId(),
        check("checkInDate", "Check-in date is required").isISO8601(),
        check("checkOutDate", "Check-out date is required").isISO8601(),
        check("guestName", "Guest name is required").not().isEmpty()
    ],
    createReservation
);

router.get(
    "/hotelStatistics/:hotelId",
    [
        check("hotelId", "Valid hotel ID is required").isMongoId()
    ],
    getHotelStatistics
);

export default router;
