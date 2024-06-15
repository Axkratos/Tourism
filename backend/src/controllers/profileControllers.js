import Profile from "../models/profileModels.js";

 const createProfile = async (req, res) => {
  try {
    const {
      profileImg,
      backgroundImg,
      name,
      location,
      quotes,
      aboutMe,
      contentLanguages,
      activities
    } = req.body;

    const newProfile = new Profile({
      profileImg,
      backgroundImg,
      name,
      location,
      quotes,
      aboutMe,
      contentLanguages,
      activities
    });

    await newProfile.save();

    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createProfile, getProfiles };