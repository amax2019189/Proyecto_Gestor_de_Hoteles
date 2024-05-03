import { ObjectId } from "mongodb";
import mongoose, {Schema} from "mongoose";

const RoomSchema = mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    roomNumber: {
        type: String,
        required: true
    },
    hotel: {
        type: Schema.Types,ObjectId,
        ref: 'Hotel',
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    datesAvailable: [{
        dateStart: {
            type: Date,
            required: true
        },
        dateEnd: {
            type: Date,
            required: true
        }, 
    }],
    state: {
        type: String,
        required: true,
        default: true
    }
});

RoomsSchema.methods.toJSON = function(){
    const { __v, _id, ...rooms} = this.toObject();
    rooms.uid = _id;
    return rooms;
}

export default mongoose.model("Room", RoomSchema);