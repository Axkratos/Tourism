import Profile from '../models/profileModel.js';

// Get profile data
const getProfileData = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile data not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile data:', error);
    res.status(500).json({ message: 'Error fetching profile data', error });
  }
};

// Update profile data
const updateProfileData = async (req, res) => {
  try {
    const newData = req.body;
    let profile = await Profile.findOne();
    
    if (profile) {
      profile = await Profile.findByIdAndUpdate(profile._id, newData, { new: true });
      res.status(200).json({ message: 'Profile data updated successfully!', data: profile });
    } else {
      profile = new Profile(newData);
      await profile.save();
      res.status(201).json({ message: 'Profile data created successfully!', data: profile });
    }
  } catch (error) {
    console.error('Error updating profile data:', error);
    res.status(500).json({ message: 'Error updating profile data', error });
  }
};

export { getProfileData, updateProfileData };
