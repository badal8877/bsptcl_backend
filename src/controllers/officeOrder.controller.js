import { OfficeOrder } from '../models/officeOrder.model.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
// import mongoose from "mongoose";

const createOfficeOrder = asyncHandler(async (req, res) => {
    const {Department, Order_Ref_No,Order_Title,Description, Publishing_Date} = req.body;

    // Validation: Check for missing fields
    if (
        [Department, Order_Ref_No,Order_Title,Description, Publishing_Date].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // Ensure a file was uploaded for Alias_Name1
    if (!req.file) {
        throw new ApiError(400, "File for Document is required");
    }

    // Create the new officeOrder object
    const newOfficeOrder = await OfficeOrder.create({
        Department,
        Description,
        Document: req.file.path,   // Store the file path from Multer upload
        Order_Ref_No,
        Order_Title, 
        Publishing_Date,
        
    });

    // Check if the newOfficeOrder was created successfully
    if (!newOfficeOrder) {
        throw new ApiError(500, "Something went wrong while creating the newOfficeOrder");
    }

    // Return success response
    return res.status(201).json(
        new ApiResponse(201, newOfficeOrder, "OfficeOrder uploaded successfully")
    );
});

// // Update a tender
// const updateOfficeOrder = asyncHandler(async (req, res) => {
//     const officeOrderId = req.params.id;
//     const { Department, Order_Ref_No,Order_Title,Description, Publishing_Date } = req.body;
//     if ([Department, Order_Ref_No,Order_Title,Description, Publishing_Date].some((field) => field?.trim() === "")) {
//         throw new ApiError(400, "All fields are required");
//     }

//     const officeOrder = await OfficeOrder.findById(officeOrderId);
//     if (!officeOrder) {
//         throw new ApiError(404, "Tender not found");
//     }

//     officeOrder.Department = Department;
//     officeOrder.Order_Ref_No = Order_Ref_No;
//     officeOrder.Order_Title = Order_Title;
//     officeOrder.Description = Description;
//     officeOrder.Publishing_Date = Publishing_Date;
   

//     if (req.file) {
//         officeOrder.Document = req.file.path;
//     }

//     await officeOrder.save();
//     return res.status(200).json(new ApiResponse(200, officeOrder, "OfficeOrder updated successfully"));
// });

// // Delete a officeOrder
// const deleteOfficeOrder = asyncHandler(async (req, res) => {
//     const officeOrderId = req.params.id;

//     // Validate ObjectId
//     if (!mongoose.Types.ObjectId.isValid(officeOrderId)) {
//         throw new ApiError(400, "Invalid officeOrderId ID");
//     }

//     // Find and delete the officeOrder by ID
//     const officeOrder = await OfficeOrder.findByIdAndDelete(officeOrderId);

//     if (!officeOrder) {
//         throw new ApiError(404, "OfficeOrder not found");
//     }

//     return res.status(200).json(new ApiResponse(200, {}, "officeOrder deleted successfully"));
// });


// Get all officeOrder
const getOfficeOrder = asyncHandler(async (req, res) => {
    // Fetch all officeOrder
    const officeOrders = await OfficeOrder.find({});

    // Check if OfficeOrder are found
    if (!officeOrders || officeOrders.length === 0) {
        throw new ApiError(404, "No officeOrder found");
    }

    // Return officeOrder in the response
    return res.status(200).json(new ApiResponse(200, officeOrders, "officeOrder fetched successfully"));
});

// Export at the end of the file
export {
    createOfficeOrder,
    getOfficeOrder
};
