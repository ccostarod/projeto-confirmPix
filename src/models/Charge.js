import sequelize from './index.js';
import { DataTypes } from 'sequelize';

const Charge = sequelize.define('Charge', {
    id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true  },
    amount: { type: DataTypes.DECIMAL(15,2), allowNull: false },
    currency: { type: DataTypes.STRING(3), allowNull: false },
    status: { type: DataTypes.ENUM, values: ['pending', 'paid', 'failed'], allowNull: false },
});

export default Charge;