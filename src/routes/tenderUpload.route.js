import { Router } from "express";
import { createTender } from '../controllers/tenderUpload.controller.js';
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

// Route to handle tender upload (only for authenticated users)
router.post('/upload', verifyJWT, upload.single('file'), createTender);



export default router