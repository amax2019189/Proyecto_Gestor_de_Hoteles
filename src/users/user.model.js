import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    nameUser: {
        type: String,
        require: [true, "The name is necessary"],
    },
    email: {
        type: String,
        require: [true, "The email is necessary"],
    },
    password: {
        type: String,
        require: [true, "The password is necessary"],
    },
});

UserSchema.methods.toJSON = function () {
    const { __v, _id, password, ...user } = this.toObject();
    user.uid = _id;
    return user;
};

export default mongoose.model("User", UserSchema);