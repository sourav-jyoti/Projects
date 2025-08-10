import mongoose, { model, Schema } from "mongoose";
mongoose.connect("mongodb+srv://vdtube:1234@vdtube.n7i5bwd.mongodb.net/?retryWrites=true&w=majority&appName=vDtube");
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String
});
export const UserModel = model("User", UserSchema);
