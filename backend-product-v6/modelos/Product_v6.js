const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/db');

const Product_v6 = sequelize.define('Product_v6', {
    partNumber: {
        type: DataTypes.TEXT,
        primaryKey: true
    },
    productType: { type: DataTypes.STRING },
    categoryCode: { type: DataTypes.STRING },
    brandCode: { type: DataTypes.STRING },
    familyCode: { type: DataTypes.STRING },
    lineCode: { type: DataTypes.STRING },
    productSegmentCode: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING },
    value: { type: DataTypes.DOUBLE },
    valueCurrency: { type: DataTypes.STRING },
    defaultQuantityUnits: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    plannerCode: { type: DataTypes.STRING },
    sourceLink: { type: DataTypes.TEXT }
}, {
    tableName: 'product_v6',
    timestamps: false
});

module.exports = Product_v6;