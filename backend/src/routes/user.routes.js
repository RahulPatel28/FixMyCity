import { Router } from "express";
import {generateDescriptionFromImageController, getMyComplaints, getSingleComplaint, loginUserController, logoutUserController, registerComplaintController, registerUserController, updatePasswordController, updateProfileController} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() }); 
const router = Router();


router.post('/register', registerUserController)
router.post('/login', loginUserController)
router.get('/logout', authMiddleware, logoutUserController)
router.post('/register/complaint', authMiddleware, upload.single('image'), registerComplaintController)
router.put('/update/profile', authMiddleware, updateProfileController)
router.put('/update/password', authMiddleware, updatePasswordController)
router.get('/complaints', authMiddleware , getMyComplaints)
router.get('/complaint/:id', authMiddleware, getSingleComplaint)

router.post("/generate-description", upload.single("image"), generateDescriptionFromImageController);


export default router;
