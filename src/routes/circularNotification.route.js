import { Router } from "express";
import {createCircularNotice ,deleteCircularNotice,getCircularNotification } from '../controllers/circularNotification.controller.js';
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

// Route to handle circular notice upload (only for authenticated users)
router.post('/create', verifyJWT, upload.single('Document'), createCircularNotice);

router.delete('/delete/:id', verifyJWT , deleteCircularNotice);

//Route to get  CircularNotification 
router.get('/getAll', getCircularNotification);
export default router

