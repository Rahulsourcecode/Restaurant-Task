import { DataTypes } from 'sequelize';
import sequelize from '../configurations/sequalize.js';

const HotelModel = sequelize.define('Hotel', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});

export default HotelModel;
