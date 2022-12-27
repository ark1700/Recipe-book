import mongoose, { Types } from 'mongoose'

export interface IUser {
  _id: Types.ObjectId,
  username: string,
  email: string,
  password: string,
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
}, { timestamps: true}) ;

export default mongoose.models.User || mongoose.model("User", UserSchema)
