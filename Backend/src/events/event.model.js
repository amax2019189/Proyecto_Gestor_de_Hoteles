import { ObjectId } from "mongodb";
import mongoose, {Schema} from "mongoose";

const EventSchema = mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    eventNumber: {
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

EventSchema.methods.toJSON = function(){
    const { __v, _id, ...events} = this.toObject();
    events.uid = _id;
    return events;
}

export default mongoose.model("Event", EventSchema);