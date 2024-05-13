import { Router } from "express";
import { check } from "express-validator";
import {
    hotelsPost,
    createReservation,
    getHotelStatistics,
    searchHotels,
    reservationsbyhotel
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
// routes searchHotels
router.get("/searchHotels",  searchHotels 
);
// routes reservationsbyhotel
router.get(
    "/reservationsbyhotel/:hotelId",
    [
        check("hotelId", "Valid hotel ID is required").isMongoId()
    ],
    reservationsbyhotel
);

export default router;