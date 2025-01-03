import Profile from "../models/profileModel.js";
import User from "../models/userModels.js";


// GET profile data by email
const getProfileDataW = async (req, res) => {
    try {
      // Assuming you may receive different parameters to filter profiles
      const filters = req.query;
  
      const profiles = await Profile.find(filters);
  
      if (!profiles || profiles.length === 0) {
        return res.status(404).json({ message: "Profiles not found" });
      }
  
      res.json(profiles);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      res.status(500).json({ message: "Error fetching profile data", error });
    }
  };
const getProfileData = async (req, res) => {
  try {
    const email = req.params.email; // Assuming email is passed as a URL parameter
    const profile = await Profile.findOne({ email });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ message: "Error fetching profile data", error });
  }
};

// UPDATE or CREATE profile data

// Get profile data
const getProfileDataC = async (req, res) => {
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
    const email = req.params.email; // Assuming email is passed as a URL parameter
    const newData = req.body;
    console.log("request", req);

    let profile = await Profile.findOne({ email });

    if (profile) {

      // If profile exists, update it
      profile = await Profile.findOneAndUpdate({ email }, newData, {
        new: true,
      });

    } else {
      // If profile doesn't exist, create a new one
      profile = new Profile({ email, ...newData });
      await profile.save();
      res.status(201).json({ message: 'Profile data created successfully!', data: profile });
    }


    res.json({ message: "Profile data updated successfully!", data: profile });
  } catch (error) {
    console.error("Error updating profile data:", error);
    res.status(500).json({ message: "Error updating profile data", error });

  }
};


const createProfileData = async (req, res) => {
  try {
    const { email, name, location, quote, aboutMeTitle, aboutMeContent, languages, activities } = req.body;

    // Validate required fields
    if (!name || !location || !quote || !aboutMeTitle || !aboutMeContent || !languages || !activities) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if a profile already exists for the given email
    let existingProfile = await Profile.findOne({ email });

    if (existingProfile) {
      // If a profile already exists, update it
      existingProfile.name = name;
      existingProfile.location = location;
      existingProfile.quote = quote;
      existingProfile.aboutMeTitle = aboutMeTitle;
      existingProfile.aboutMeContent = aboutMeContent;
      existingProfile.languages = languages.split(',').map(language => language.trim()); // Convert to array of strings
      existingProfile.activities = activities.split(',').map(activity => activity.trim()); // Convert to array of strings

      // Save the updated profile
      await existingProfile.save();
    } else {
      // If no profile exists, create a new one
      existingProfile = new Profile({
        email,
        name,
        location,
        quote,
        aboutMeTitle,
        aboutMeContent,
        languages: languages.split(',').map(language => language.trim()), // Convert to array of strings
        activities: activities.split(',').map(activity => activity.trim()), // Convert to array of strings
      });

      // Save the new profile
      await existingProfile.save();
    }

    // Find the user by email and update the 'form' field to 'submitted'
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the 'form' field in the user model to 'submitted'
    user.form = 'submitted';
    await user.save();

    res.status(200).json({ message: 'Profile created/updated successfully and form marked as submitted', data: existingProfile });
  } catch (error) {
    console.error('Error creating/updating profile:', error);
    res.status(500).json({ message: 'Error creating/updating profile', error });
  }
};

// Export the controller methods


export { getProfileData, updateProfileData, createProfileData,getProfileDataW };
