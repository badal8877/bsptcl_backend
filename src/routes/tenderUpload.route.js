import { Router } from "express";
import { createTender, cancelTender, updateTender, deleteTender, archiveTenders, getAllTenders } from '../controllers/tenderUpload.controller.js';
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

// Route to handle tender upload (only for authenticated users)
router.post('/upload', verifyJWT, upload.single('Alias_Name1'), createTender);

// Route to update an existing tender (with optional file upload)
router.put('/update/:id', upload.single('Alias_Name1'), updateTender);

// Route to manually trigger archiving of expired tenders
router.post('/archiveExpireTenders', archiveTenders);

// Route to handle cancelling a tender (only for authenticated users)
router.patch('/cancel/:id', verifyJWT, cancelTender);

//Route to delete an existing tender 
router.delete('/delete/:id', deleteTender);

// Route to get all tenders
router.get('/getAll', getAllTenders);

export default router