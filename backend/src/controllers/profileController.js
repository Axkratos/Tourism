import Profile from "../models/profileModel.js";


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

// CREATE new profile data
const createProfileData = async (req, res) => {
    console.log(req.body);
    try {
        const {
            email,
            name,
            location,
            profileImage,
            backgroundImage,
            quote,
            aboutMeTitle,
            aboutMeContent,
            languages,
            activities,
        } = req.body;

        // Validate required fields
        if (!name || !location || !profileImage || !backgroundImage || !quote || !aboutMeTitle || !aboutMeContent || !languages || !activities) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const profile = new Profile({
            email,
            name,
            location,
            profileImage,
            backgroundImage,
            quote,
            aboutMeTitle,
            aboutMeContent,
            languages, // Assuming languages and activities are correctly provided as arrays
            activities,
        });

        await profile.save();

        res.status(201).json({ message: "Profile created successfully!", data: profile });
    } catch (error) {
        console.error("Error creating profile:", error);
        res.status(500).json({ message: "Error creating profile", error });
    }
};

export { getProfileData, updateProfileData, createProfileData,getProfileDataW };
