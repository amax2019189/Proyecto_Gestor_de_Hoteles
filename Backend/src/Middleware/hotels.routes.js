// ...
import { getRecentReservations } from './reservations.controller.js';

const router = Router();

// ...

router.get('/reservations/:userId', getRecentReservations);

export default router;