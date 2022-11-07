import mongoose from 'mongoose';

import config from '@config';

import Bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  name: String,

  email: String,

  createdAt: String,

  updatedAt: String,

  password: String,
});

UserSchema.methods.generateToken = function() {
  return jwt.sign(this.email, config.jwtSecret);
};

UserSchema.methods.comparePasswords = function (plainPassword) {
  
  return Bcrypt.compareSync(plainPassword, this.password);
};

function loadModel(modelName, modelSchema) {
  return mongoose.models[modelName] // Check if the model exists
    ? mongoose.model(modelName) // If true, only retrieve it
    : mongoose.model(modelName, modelSchema); // If false, define it
}
export default () => loadModel('User', UserSchema);
