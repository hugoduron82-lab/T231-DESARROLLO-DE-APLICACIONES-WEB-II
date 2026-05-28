const express = require('express');
const Product_v6 = require('./modelos/Product_v6');
const sequelize = require('./conexion/db');

const app = express();

app.use(express.json());

app.get('/productos', async (req, res) => {
    try {
        const productos = await Product_v6.findAll();
        res.status(200).json({ message: 'Lista de productos', data: productos });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
});


/* 8. Valor total de productos por productType

SELECT productType, SUM(value) AS valor_total FROM Product_v6 GROUP BY productType;*/

// GET /valor-total-por-tipo
app.get('/valor-total-por-tipo', async (req, res) => {
    try {
        const resultado = await Product_v6.findAll({
            attributes: [
                'productType',
                [sequelize.fn('SUM', sequelize.col('value')), 'valor_total']
            ],
            group: ['productType']
        });
        res.status(200).json({ message: 'Valor total por tipo de producto', data: resultado });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener valor total por tipo', error: error.message });
    }
});


// 9. Valor máximo y mínimo por productType
// SELECT productType, MAX(value) AS valor_maximo, MIN(value) AS valor_minimo FROM Product_v6 GROUP BY productType;

app.get('/min-max-por-tipo', async (req, res) => {
    try {
        const resultado = await Product_v6.findAll({
            attributes: [
                'productType',
                [sequelize.fn('MAX', sequelize.col('value')), 'valor_maximo'],
                [sequelize.fn('MIN', sequelize.col('value')), 'valor_minimo']
            ],
            group: ['productType']
        });
        res.status(200).json({ message: 'Valor máximo y mínimo por tipo de producto', data: resultado });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener valores máximo/mínimo por tipo', error: error.message });
    }
});

// 11. Contar productos por status
// SELECT status, COUNT(*) AS cantidad FROM Product_v6 GROUP BY status;

app.get('/conteo-por-status', async (req, res) => {
    try {
        const resultado = await Product_v6.findAll({
            attributes: [
                'status',
                [sequelize.fn('COUNT', sequelize.col('status')), 'cantidad']
            ],
            group: ['status']
        });
        res.status(200).json({ message: 'Cantidad de productos por status', data: resultado });
    } catch (error) {
        res.status(500).json({ message: 'Error al contar productos por status', error: error.message });
    }
});


// 12. Valor total de productos por brand.code
// SELECT brandCode, SUM(value) AS valor_total FROM Product_v6 GROUP BY brandCode;

app.get('/valor-total-por-marca', async (req, res) => {
    try {
        const resultado = await Product_v6.findAll({
            attributes: [
                'brandCode',
                [sequelize.fn('SUM', sequelize.col('value')), 'valor_total']
            ],
            group: ['brandCode']
        });
        res.status(200).json({ message: 'Valor total por código de marca', data: resultado });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener valor total por marca', error: error.message });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
