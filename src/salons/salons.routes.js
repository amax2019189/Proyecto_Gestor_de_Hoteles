import { Router } from "express";
import { check } from "express-validator";
import {
  salonsPost,
  scheduleEvent,
  modifyEvent,
  cancelEvent,
} from "./salons.controller.js";

const router = Router();

router.post(
  "/createSalon",
  [
    check("name", "The name is necessary").not().isEmpty(),
    check("amount", "The quantity is necessary").isNumeric(),
    check("eventType", "Event type is required to book").not().isEmpty(),
  ],
  salonsPost
);

router.post(
  "/scheduleEvent",
  [
    check("salonId", "Salon ID is required").isMongoId(),
    check("date", "Date of the event is required").not().isEmpty(),
    check("duration", "Duration of the event is required").not().isEmpty(),
    check(
      "specialRequirements",
      "Special requirements should be mentioned"
    ).optional(),
  ],
  scheduleEvent
);

router.patch(
  "/modifyEvent",
  [
    check("salonId", "Salon ID is required").isMongoId(),
    check("eventId", "Event ID is required").isMongoId(),
    check("newDetails", "New details are required to modify the event")
      .not()
      .isEmpty(),
  ],
  modifyEvent
);

router.delete(
  "/cancelEvent",
  [
    check("salonId", "Salon ID is required").isMongoId(),
    check("eventId", "Event ID is required").isMongoId(),
  ],
  cancelEvent
);

export default router;
