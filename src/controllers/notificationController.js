import Notification from "../models/Notification.js";
import Charge from "../models/Charge.js";

class NotificationController {
    async add(chargeId) {
        try {
            const charge = await Charge.findByPk(chargeId);
            if (!charge) {
                throw new Error('Charge not found');
            }
            const notification = await Notification.create({
                value: charge.amount,
                paymentStatus: charge.status,
                notificationStatus: 'pending',
                chargeId: chargeId
            });
            return notification;
        }
        catch (error) {
            console.error('Error adding notification:', error);
            throw error; // Propagar o erro para ser tratado por quem chamou
        }
    }

    async getAll(req, res) {
        try {
            const notifications = await Notification.findAll();
            return res.status(200).json(notifications);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    async update(req, res) {
        const { id, notificationStatus } = req.body;
        try {
            const notification = await Notification.findByPk(id);
            if (!notification) {
                return res.status(404).json({ message: 'Notification not found' });
            }
            notification.notificationStatus = notificationStatus;
            await notification.save();
            return res.status(200).json(notification);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}

export default NotificationController;