// profileModel.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const profileSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    profileImage: { type: String, required: true },
    backgroundImage: { type: String, required: true },
    quote: { type: String, required: true },
    aboutMeTitle: { type: String, required: true },
    aboutMeContent: { type: String, required: true },
    languages: { type: [String], required: true },
    activities: { type: [String], required: true },
});

const Profile = model('Profile', profileSchema);

export default Profile;
