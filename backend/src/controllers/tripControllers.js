import Trip from '../models/tripModels.js';

export const createTrip = async (req, res) => {
    try {
        console.log('entered');
        console.log(req.body)
        const newTrip = new Trip(req.body);
        const savedTrip = await newTrip.save();
        console.log(savedTrip);
        res.status(201).json(savedTrip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find();
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
};

export const getTripById = async (req, res) => {
    console.log('enttt')
    try {
        const guideId = req.params.id;
        const trip = await Trip.find({guideId}).populate({ path: 'userId', select: '-password -roles -createdAt -updatedAt'  });

        console.log(trip);
        res.status(200).json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

