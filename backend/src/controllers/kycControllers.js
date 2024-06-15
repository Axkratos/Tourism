import KYC from '../models/kycModels.js';

export const createKYC = async (req, res) => {
  try {
    const { name, citizenshipNumber } = req.body;
    const image = req.files.image ? req.files.image[0].filename : null;
    const citizenshipPhoto = req.files.citizenshipPhoto ? req.files.citizenshipPhoto[0].filename : null;
    const cv = req.files.cv ? req.files.cv[0].filename : null;

    if (!name || !citizenshipNumber || !image || !citizenshipPhoto) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newKYC = new KYC({
      name,
      citizenshipNumber,
      image,
      citizenshipPhoto,
      cv,
    });

    await newKYC.save();

    res.status(201).json({ message: 'KYC form submitted successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
};
