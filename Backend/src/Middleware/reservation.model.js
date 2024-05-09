import mongoose, { Schema } from 'mongoose';

const ReservationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});