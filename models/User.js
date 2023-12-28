import { Schema, model } from "mongoose";


const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  google: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  status: {
    type: Boolean,
    default: true
  }
});

// Overwrite JSON Object method
userSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
}


// Model name must be singular
export default model('User', userSchema);

