import mongoose, { Schema } from "mongoose";

const availabilityType = {
  values: ["available", "not available"],
};

const RoomSchema = mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  availability: {
    type: String,
    enum: availabilityType,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },

  dateStart: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
});

RoomSchema.methods.toJSON = function () {
  const { __v, _id, ...rooms } = this.toObject();
  rooms.uid = _id;
  return rooms;
};

export default mongoose.model("Room", RoomSchema);
