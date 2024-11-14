import { TransferPosting } from "../models/transferPosting.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// import mongoose from "mongoose";

// Create a new circularnotice (admin only)
const createTransferPosting = asyncHandler(async (req, res) => {
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

    const newTransferPosting = new TransferPosting({
        Department,
        HeadLine,
        Description,
        Document: req.file.path,  // Store the file path from Multer upload
        Issue_Date
    });

    // Save the circularnotice to the database
    const savedTransferPosting = await newTransferPosting.save();

    // Check if the circularnotice was created successfully
    if (!savedTransferPosting) {
        throw new ApiError(500, "Something went wrong while creating the TransferPosting");
    }

    // Return success response
    return res.status(201).json(
        new ApiResponse(201, newTransferPosting, "TransferPosting created successfully")
    );


});
   
// Get all officeOrder
const getTransferPosting = asyncHandler(async (req, res) => {
    // Fetch all officeOrder
    const getTransferPostings = await TransferPosting.find({});

    // Check if OfficeOrder are found
    if (!getTransferPostings || getTransferPostings.length === 0) {
        throw new ApiError(404, "No getTransferPostings found");
    }

    // Return officeOrder in the response
    return res.status(200).json(new ApiResponse(200, getTransferPostings, "getTransferPostings fetched successfully"));
});


// Use  export 
export {
    createTransferPosting,
    getTransferPosting
};
