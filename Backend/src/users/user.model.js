import mongoose, {Schema} from "mongoose"

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: [true, "The email is necessary"],
    },
    username: {
        trype: String,
        require: [true, "The username is necessary"],
    },
    password: {
        type: String,
        require: [true, "The password is necessary"],
    }
})

UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

export default mongoose.model('User', UserSchema)