import Profile from '../models/profileModel.js';

const getProfileData = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile data', error });
  }
};

const updateProfileData = async (req, res) => {
  try {
    const newData = req.body;
    let profile = await Profile.findOne();
    
    if (profile) {
      profile = await Profile.findByIdAndUpdate(profile._id, newData, { new: true });
    } else {
      profile = new Profile(newData);
      await profile.save();
    }

    res.json({ message: 'Profile data updated successfully!', data: profile });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile data', error });
  }
};

export { getProfileData, updateProfileData };
