// controllers/kycController.js
import KYC from '../models/kycModels.js';

export const createKYC = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.files);
    
    const { name, citizenshipNumber } = req.body;
    const image = req.files.image ? req.files.image.filename : null;
    const citizenshipPhoto = req.files.citizenshipPhoto ? req.files.citizenshipPhoto.filename : null;
    const cv = req.files.cv ? req.files.cv.filename : null;

    if (!image || !citizenshipPhoto) {
      return res.status(400).json({ message: 'Image and citizenship photo are required' });
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
    res.status(500).json({ message: error.message });
  }
};
