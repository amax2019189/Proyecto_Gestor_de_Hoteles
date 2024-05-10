import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel', 
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    guestName: {
        type: String,
        required: true
    }
});

const Reservation = mongoose.model('Reservation', ReservationSchema);
export default Reservation;
