import mongoose, {Schema} from "mongoose"

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
    role: {
        type: String,
        enum: ['ROL_USER', 'ROL_ADMIN'],
        default: 'ROL_USER'
    }
})


UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

export default mongoose.model('User', UserSchema)