import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  profileImg: {
    type: String,
    required: false
  },
  backgroundImg: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  quotes: {
    type: String,
    required: true
  },
  aboutMe: {
    type: String,
    required: true
  },
    content:{
    type: String,
    required: true
    },
  Languages: {
    type: [String],
    required: true
  },
  activities: {
    type: [String],
    required: true
  }
});

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;
