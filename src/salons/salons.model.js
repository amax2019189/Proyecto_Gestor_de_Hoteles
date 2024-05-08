import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    date: String,
    duration: String,
    specialRequirements: { type: String, default: "" }
});

const SalonsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "The name is necessary"], 
    },
    amount: {
        type: Number,
        required: [true, "The quantity is necessary"] 
    },
    eventType: {
        type: String,
        required: [true, "Event type is required to book"]  
    },
    stateSalon: {
        type: Boolean,
        default: true
    },
    events: [eventSchema] 
});

SalonsSchema.methods.toJSON = function() {
    const { __v, _id, ...salons } = this.toObject();
    salons.uid = _id;
    return salons;
}

export default mongoose.model('Salons', SalonsSchema);
