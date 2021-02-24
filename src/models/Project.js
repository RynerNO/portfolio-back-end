import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: String,
  tech: Array,
  link: {
    type: String,
    default: ''
  },
  git: String,
  pages: Array,
  projectID: String,
  createdAt: String,
  updatedAt: String,
});
ProjectSchema.pre('save', function() {
  this.createdAt = new Date();
});
function loadModel(modelName, modelSchema) {
  return mongoose.models[modelName] // Check if the model exists
    ? mongoose.model(modelName) // If true, only retrieve it
    : mongoose.model(modelName, modelSchema); // If false, define it
}
export default () => loadModel('Project', ProjectSchema);