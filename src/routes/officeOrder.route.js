import { Router } from "express";
import {
    createOfficeOrder, getOfficeOrder
} from '../controllers/officeOrder.controller.js';
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

// Route to handle tender upload (only for authenticated users)
router.post('/create', verifyJWT, upload.single('Document'), createOfficeOrder);

//Route to get active tenders 
router.get('/getAll', getOfficeOrder);

export default router