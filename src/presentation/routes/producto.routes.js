const express = require('express');
const router = express.Router();
const productoRepository = require('../../infrastructure/repositories/ProductoRepository');
const { NotFoundError, ValidationError } = require('../../common/errors/AppError');

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 */
router.get('/', async (req, res, next) => {
  try {
    const productos = await productoRepository.findAll();
    res.json(productos.map(p => p.toJSON()));
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', async (req, res, next) => {
  try {
    const producto = await productoRepository.findById(parseInt(req.params.id));
    if (!producto) {
      throw new NotFoundError('Producto no encontrado');
    }
    res.json(producto.toJSON());
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoInput'
 *     responses:
 *       201:
 *         description: Producto creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 */
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.nombre || !req.body.precioVenta || !req.body.precioCompra) {
      throw new ValidationError('El nombre, precio de venta y precio de compra son requeridos');
    }
    const producto = await productoRepository.create(req.body);
    res.status(201).json(producto.toJSON());
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Actualiza un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoInput'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 */
router.put('/:id', async (req, res, next) => {
  try {
    const producto = await productoRepository.update(parseInt(req.params.id), req.body);
    if (!producto) {
      throw new NotFoundError('Producto no encontrado');
    }
    res.json(producto.toJSON());
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Elimina un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Producto eliminado
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await productoRepository.delete(parseInt(req.params.id));
    if (!deleted) {
      throw new NotFoundError('Producto no encontrado');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
