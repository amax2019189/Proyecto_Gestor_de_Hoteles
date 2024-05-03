import mongoose, {Schema} from "mongoose";

const SalonsSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "The name is necessary"],
    },
    amount: {
        type: Number,
        require: [true, "The quantity is necessary"]
    },
    eventType: {
        type: String,
        require: [true, "Event type is required to book"]
    }
})

SalonsSchema.methods.toJSON = function(){
    const { __v, _id, ...salons} = this.toObject();
    salons.uid = _id;
    return salons;
}

export default mongoose.model('Salons', SalonsSchema);