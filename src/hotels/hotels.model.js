import mongoose, { Schema } from "mongoose";

const HotelSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "The name is necessary"],
  },
  quantityRooms: {
    type: Number,
    require: [true, "The number of rooms is necessary"],
  },
  location: {
    type: String,
    require: [true, "Location is mandatory."],
  },
  owner: {
    type: String,
    require: [true, "Owner's name is required"],
  },
  stateHotel: {
    type: Boolean,
    default: true,
  },
});

HotelSchema.methods.toJSON = function () {
  const { __v, _id, ...hotels } = this.toObject();
  hotels.uid = _id;
  return hotels;
};

export default mongoose.model("Hotel", HotelSchema);
