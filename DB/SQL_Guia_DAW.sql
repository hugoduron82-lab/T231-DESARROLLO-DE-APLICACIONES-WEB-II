USE graficos;

-- 1. Contar productos en la tabla

SELECT COUNT(*) AS total_productos
FROM Product_v6;

-- 2. Calcular el valor total de todos los productos

SELECT SUM(value) AS valor_total
FROM Product_v6;

-- 3. Obtener el valor promedio de los productos

SELECT AVG(value) AS valor_promedio
FROM Product_v6;

-- 4. Encontrar el producto con el valor más alto

SELECT *
FROM Product_v6
WHERE value = (SELECT MAX(value) FROM Product_v6);

-- 5. Encontrar el producto con el valor más bajo

SELECT *
FROM Product_v6
WHERE value = (SELECT MIN(value) FROM Product_v6);

-- 6. Contar productos por tipo de moneda (valueCurrency)

SELECT valueCurrency, COUNT(*) AS cantidad
FROM Product_v6
GROUP BY valueCurrency;

-- 7. Valor promedio de productos por tipo de moneda

SELECT valueCurrency, AVG(value) AS promedio_valor
FROM Product_v6
GROUP BY valueCurrency;

-- 8. Valor total de productos por productType

SELECT productType, SUM(value) AS valor_total
FROM Product_v6
GROUP BY productType;

-- 9. Valor máximo y mínimo por productType

SELECT productType,
       MAX(value) AS valor_maximo,
       MIN(value) AS valor_minimo
FROM Product_v6
GROUP BY productType;

-- 10. Valor promedio de productos por category.code

SELECT  categoryCode, AVG(value) AS promedio_valor
FROM Product_v6
GROUP BY categoryCode;

-- 11. Contar productos por status

SELECT status, COUNT(*) AS cantidad
FROM Product_v6
GROUP BY status;

-- 12. Valor total de productos por brand.code

SELECT brandCode, SUM(value) AS valor_total
FROM Product_v6
GROUP BY brandCode;

-- 13. Número total de partNumber únicos

SELECT COUNT(DISTINCT partNumber) AS total_partNumber_unicos
FROM Product_v6;

-- 14. Valor promedio y cantidad por line.code

SELECT lineCode,
       COUNT(*) AS cantidad_productos,
       AVG(value) AS valor_promedio
FROM Product_v6
GROUP BY lineCode;

-- 15. Producto con valor más alto por cada plannerCode

SELECT t1.*
FROM Product_v6 t1
INNER JOIN (
    SELECT plannerCode, MAX(value) AS max_valor
    FROM Product_v6
    GROUP BY plannerCode
) t2 ON t1.plannerCode = t2.plannerCode AND t1.value = t2.max_valor;




