import { Router } from "express";
import { createTransferPosting, getTransferPosting } from '../controllers/transferPosting.controller.js';
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

// Route to handle circular notice upload (only for authenticated users)
router.post('/create', verifyJWT, upload.single('Document'), createTransferPosting);

//Route to get  CircularNotification 
router.get('/getAll', getTransferPosting);
export default router

