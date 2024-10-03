import { TenderUpload } from '../models/tenderUpload.model.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
// import {cron} from 'node-cron';

const createTender = asyncHandler(async (req, res) => {
    const { HeadLine, Description, Alias_Name2, Alias_Name3, Publishing_Date, Closing_Date } = req.body;

    // Validation: Check for missing fields
    if (
        [HeadLine, Description, Publishing_Date, Closing_Date].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // Ensure a file was uploaded for Alias_Name1
    if (!req.file) {
        throw new ApiError(400, "File for Alias_Name1 is required");
    }

    // Create the new tender object
    const newTender = await TenderUpload.create({
        HeadLine,
        Description,
        Alias_Name1: req.file.path,  // Store the file path from Multer upload
        Alias_Name2,
        Alias_Name3,
        Publishing_Date,
        Closing_Date
    });

    // Check if the tender was created successfully
    if (!newTender) {
        throw new ApiError(500, "Something went wrong while creating the tender");
    }

    // Return success response
    return res.status(201).json(
        new ApiResponse(201, newTender, "Tender uploaded successfully")
    );
});

//  Cancel a tender by setting its status to 'cancelled'

const cancelTender = asyncHandler(async (req, res) => {
    const tenderId = req.params.id;

    // Find the tender by ID
    const tender = await TenderUpload.findById(tenderId);

    if (!tender) {
        throw new ApiError(404, "Tender not found");
    }

    // Update the tender status to 'cancelled'
    tender.status = 'cancelled'; // Assume you have a status field in your model
    await tender.save();

    return res.status(200).json(
        new ApiResponse(200, tender, "Tender cancelled successfully")
    );
});


// Automatically archive expired tenders (where Closing_Date is in the past).
 
const archiveTenders = asyncHandler(async (req, res) => {
    try {
        const currentDate = new Date();

        // Find all tenders whose status is 'active' and Closing_Date is in the past
        const expiredTenders = await TenderUpload.find({
            status: 'active',
            Closing_Date: { $lt: currentDate }  // Tenders with a Closing_Date before now
        });

        if (expiredTenders.length > 0) {
            // Update the status of expired tenders to 'archived'
            for (const tender of expiredTenders) {
                tender.status = 'archived';
                await tender.save();
            }
            console.log(`${expiredTenders.length} tenders archived automatically.`);
        } else {
            console.log("No expired tenders to archive.");
        }
    } catch (error) {
        // Async errors will now be passed through asyncHandler
        console.error('Error while archiving tenders:', error);
    }
});

// Export at the end of the file
export { 
    createTender,
    cancelTender,
    archiveTenders

 };
