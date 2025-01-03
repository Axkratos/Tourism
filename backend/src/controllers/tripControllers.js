import Trip from '../models/tripModels.js';

export const createTrip = async (req, res) => {
    try {
        const newTrip = new Trip(req.body);
        const savedTrip = await newTrip.save();
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

export const getTripsByGuideEmail = async (req, res) => {
    const guideEmail = req.params.email; // Extract guide email from URL parameter
console.log(guideEmail)
    try {
        // Find all trips where the guide email matches
        const trips = await Trip.find({ guide: guideEmail });

        // If no trips found, return a message
        if (trips.length === 0) {
            return res.status(404).json({ message: 'No trips found for this guide.' });
        }

        // Return the trips data
        return res.status(200).json({
            trips: trips.map((trip) => ({
                location: trip.location,
                guide: trip.guide,
                tourist: trip.tourist,
                dateFrom: trip.dateFrom,
                dateTo: trip.dateTo,
                numPeople: trip.numPeople,
                priceBid: trip.priceBid,
            })),
        });
    } catch (error) {
        // Handle errors and send an error message
        console.error('Error fetching trips:', error);
        return res.status(500).json({ message: 'Server error, please try again later.' });
    }
};