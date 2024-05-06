import { ObjectId } from "mongodb";
import mongoose, {Schema} from "mongoose";

<<<<<<< HEAD
=======
const availabilityType = {
    values: ['available', 'not available']
}

>>>>>>> main
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
<<<<<<< HEAD
        type: Schema.Types,ObjectId,
=======
        type: Schema.Types.ObjectId,
>>>>>>> main
        ref: 'Hotel',
        required: true
    },
    availability: {
<<<<<<< HEAD
        type: Boolean,
        required: true
=======
        type: String,
        enum: availabilityType,
        required: true,
>>>>>>> main
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
<<<<<<< HEAD
    }],
    state: {
        type: String,
        required: true,
        default: true
    }
});

RoomsSchema.methods.toJSON = function(){
=======
    }]
});

RoomSchema.methods.toJSON = function(){
>>>>>>> main
    const { __v, _id, ...rooms} = this.toObject();
    rooms.uid = _id;
    return rooms;
}

export default mongoose.model("Room", RoomSchema);