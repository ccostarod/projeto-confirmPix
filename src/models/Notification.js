import sequelize from './index.js';
import { DataTypes } from 'sequelize';

const Notification = sequelize.define('Notification', {
	id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
	value: { type: DataTypes.DECIMAL(15,2), allowNull: false },
	paymentStatus: { type: DataTypes.ENUM, values: ['pending', 'paid', 'failed'], allowNull: false },
	notificationStatus: { type: DataTypes.ENUM, values: ['pending', 'notified', 'failed'], allowNull: false },
	chargeId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, references: { model: 'Charges', key: 'id' } }
});

export default Notification;