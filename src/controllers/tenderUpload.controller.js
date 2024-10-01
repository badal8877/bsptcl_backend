import { TenderUpload } from '../models/tenderUpload.model.js';

export const createTender = async (req, res) => {
    try {
        const { HeadLine, Alias_Name1, Alias_Name2, Alias_Name3, Publishing_Date, Closing_Date } = req.body;

        const newTender = new TenderUpload({
            HeadLine,
            Alias_Name1,
            Alias_Name2,
            Alias_Name3,
            Publishing_Date,
            Closing_Date
        });

        // Save the tender information to the database
        await newTender.save();

        res.status(201).json({ message: "Tender uploaded successfully", tender: newTender });
    } catch (error) {
        res.status(500).json({ message: "Error uploading tender", error });
    }
};
