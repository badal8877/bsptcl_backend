import { NoticeBoard } from "../models/noticeBoard.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

// Create a new notice (admin only)
const createNotice = asyncHandler(async (req, res) => {
    const { Department, HeadLine, Description, Publishing_Date } = req.body;

    // Validation: Check for missing fields
    if (
        [HeadLine, Description, Department,Publishing_Date].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // Ensure a file was uploaded for document
    if (!req.file) {
        throw new ApiError(400, "File for document is required");
    }

    const newNotice = new NoticeBoard({
        Department,
        HeadLine,
        Description,
        Document: req.file.path,  // Store the file path from Multer upload
        Publishing_Date
    });

    // Save the notice to the database
    const savedNotice = await newNotice.save();

    // Emit the new notice to all connected clients (WebSocket)
    // req.io.emit('new-notice', savedNotice);

    // Check if the notice was created successfully
    if (!savedNotice) {
        throw new ApiError(500, "Something went wrong while creating the notice");
    }

    // Return success response
    return res.status(201).json(
        new ApiResponse(201, newNotice, "Notice created successfully")
    );


});
   
// Delete a notice
const deleteNotice = asyncHandler(async (req, res) => {
    const noticeId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(noticeId)) {
        throw new ApiError(400, "Invalid notice ID");
    }

    // Find and delete the notice by ID
    const notice = await NoticeBoard.findByIdAndDelete(noticeId);

    if (!notice) {
        throw new ApiError(404, "Notice not found");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Notice deleted successfully"));
});

// Get all notices (admin only)
const getAllNotices = asyncHandler(async (req, res) => {
    try {
        // Retrieve all notices from the database
        const notices = await NoticeBoard.find();

        if (!notices.length) {
            throw new ApiError(404, "No notices found");
        }

        // Return all notices
        return ApiResponse(res, 'Notices retrieved successfully', notices);
    } catch (error) {
        return ApiError(res, 'Error retrieving notices', error.message);
    }
});

// Use  export 
export {
    createNotice,
    deleteNotice,
    getAllNotices

};
