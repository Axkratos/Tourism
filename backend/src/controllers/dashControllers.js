// controllers/dashController.js
import Dash from '../models/dashModels.js';

// Create a new dash entry
const createDash = async (req, res) => {
  try {
    const { address, aboutMe, visitLocation, language,phoneNumber } = req.body;
    const newDash = new Dash({ address, aboutMe, visitLocation, language ,phoneNumber});
    const savedDash = await newDash.save();
    res.status(201).json(savedDash);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all dash entries
 const getAllDash = async (req, res) => {
  try {
    const allDash = await Dash.find();
    res.status(200).json(allDash);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific dash entry by ID
 const getDashById = async (req, res) => {
  try {
    const { id } = req.params;
    const dash = await Dash.findById(id);
    if (!dash) {
      res.status(404).json({ message: 'Dash entry not found' });
      return;
    }
    res.status(200).json(dash);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a dash entry by ID
// Update a dash entry by ID
const updateDashById = async (req, res) => {
  try {
    const { id } = req.params;
    const { address, aboutMe, visitLocation, language, phoneNumber } = req.body; // Include phoneNumber here
    const updatedDash = await Dash.findByIdAndUpdate(id, { address, aboutMe, visitLocation, language, phoneNumber }, { new: true });
    if (!updatedDash) {
      res.status(404).json({ message: 'Dash entry not found' });
      return;
    }
    res.status(200).json(updatedDash);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export { createDash , getAllDash,getDashById,updateDashById}