
import express from 'express';
import { getDeviceStatus, updateDeviceStatus } from '../controllers/iotController.js';
import { adminProtect,protect } from "../middlewares/protectedRoute.js";
const router = express.Router();

router.get('/device/status', adminProtect,getDeviceStatus);


router.post('/device/status', updateDeviceStatus);

export default router;
