import { CircularNotification } from "../models/circularNotification.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

// Create a new circularnotice (admin only)
const createCircularNotice = asyncHandler(async (req, res) => {
    const { Department, HeadLine, Description, Issue_Date } = req.body;

    // Validation: Check for missing fields
    if (
        [HeadLine, Description, Department,Issue_Date].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // Ensure a file was uploaded for document
    if (!req.file) {
        throw new ApiError(400, "File for document is required");
    }

    const newCircularNotice = new CircularNotification({
        Department,
        HeadLine,
        Description,
        Document: req.file.path,  // Store the file path from Multer upload
        Issue_Date
    });

    // Save the circularnotice to the database
    const savedCircularNotice = await newCircularNotice.save();

    // Emit the new notice to all connected clients (WebSocket)
    // req.io.emit('new-notice', savedNotice);

    // Check if the circularnotice was created successfully
    if (!savedCircularNotice) {
        throw new ApiError(500, "Something went wrong while creating the circularnotice");
    }

    // Return success response
    return res.status(201).json(
        new ApiResponse(201, newCircularNotice, "CircularNotice created successfully")
    );


});
   
// Delete a circularnotice
const deleteCircularNotice = asyncHandler(async (req, res) => {
    const circularnoticeId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(circularnoticeId)) {
        throw new ApiError(400, "Invalid circularnotice ID");
    }

    // Find and delete the notice by ID
    const circularnotice = await CircularNotification.findByIdAndDelete(circularnoticeId);

    if (!circularnotice) {
        throw new ApiError(404, "Circular Notice not found");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Circular Notice deleted successfully"));
});


// Use  export 
export {
    createCircularNotice,
    deleteCircularNotice
};
