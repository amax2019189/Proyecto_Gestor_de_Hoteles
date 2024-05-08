import mongoose, {Schema} from "mongoose"

const rolesUsersHotels = ['admin', 'user', 'hotel'];

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    username:{
        type: String
    },
    password:{
        type: String
    },
    roleUser: {
        type: String,
        enum: rolesUsersHotels,
        required: true,
    },
    stateUser:{
        type: Boolean,
        default: true
    }
})


UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

export default mongoose.model('User', UserSchema)