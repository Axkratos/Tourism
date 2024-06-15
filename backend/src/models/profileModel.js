import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  profileImage: { type: String, required: true },
  backgroundImage: { type: String, required: true },
  quote: { type: String, required: true },
  
  aboutMeTitle: { type: String, required: true },
  aboutMeContent: { type: String, required: true },
  languages: { type: String, required: true },
  activities: { type: String, required: true },
  email: { type: String, required: true },  // Hidden email field
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
