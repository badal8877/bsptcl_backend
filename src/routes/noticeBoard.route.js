import { Router } from "express";
import { createNotice, deleteNotice} from '../controllers/noticeBoard.controller.js';
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

// Route to handle Notice upload (only for authenticated users)
router.post('/create', verifyJWT, upload.single('Document'), createNotice);
router.delete('/delete/:id', verifyJWT , deleteNotice);

export default router

