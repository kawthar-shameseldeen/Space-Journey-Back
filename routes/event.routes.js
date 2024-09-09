import express from 'express';
import { getEvents, addEventToUser } from '../controllers/eventControlelr.js';

const router = express.Router();

router.get('/events', getEvents);     
router.post('/events', addEventToUser);   

export default router;
