// Import necessary modules
import Review from '../models/reviewModel.js'; // Adjust path as needed
import User from '../models/userModels.js'; // Assuming you have a User model

// Controller to add a review
const addReview = async (req, res) => {
  try {
    // Destructure review data from request body
    const { review, rating, guideId } = req.body;

    // Ensure user is authenticated (req.user should be set by protectedRoutes middleware)
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    // Find user by ID to get user's fullName (or any other required user details)
    const user = await User.findById(req.user._id).select('fullName');
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Create a new review instance
    const newReview = new Review({
      review,
      rating,
      user: req.user._id, // Assigning the user ID to the review
      guide: guideId, // Assuming guideId is provided in the request body
    });

    // Save the new review to the database
    const savedReview = await newReview.save();

    // Respond with success message and the saved review object
    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      review: { ...savedReview.toObject(), userName: user.fullName }, // Adding userName field to the response
    });
  } catch (error) {
    console.error("Error in addReview controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addReview };
