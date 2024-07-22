import express from 'express';
const router = express.Router();
import ChargeController from '../controllers/chargeController.js';
import NotificationController from '../controllers/notificationController.js';

const chargeController = new ChargeController();
router.post('/charges', chargeController.add);
router.get('/charges', chargeController.getAll);

const notificationController = new NotificationController();
router.get('/notifications', notificationController.getAll);
router.post('/notifications', notificationController.add);
export default router;