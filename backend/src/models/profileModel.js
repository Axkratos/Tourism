import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Profile Schema
const profileSchema = new Schema({
email: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  quote: { type: String, required: true },
  aboutMeTitle: { type: String, required: true },
  aboutMeContent: { type: String, required: true },
  languages: { type: [String], required: true },
  activities: { type: [String], required: true },
}, { timestamps: true }); // Added timestamps for creation and update times

// Create and export Profile model
const Profile = model('Profile', profileSchema);
export default Profile;
