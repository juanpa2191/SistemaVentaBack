const express = require('express');
const router =  express.Router();
const clienteRepository = require('../../infrastructure/repositories/ClienteRepository');   
const { NotFoundError, ValidationError } = require('../../common/errors/AppError');

/** 
* @swagger
* /api/clientes:
*   get:
*     summary: Obtiene todos los clientes
*     tags: [Clientes]
*     responses:
*       200:
*         description: Lista de clientes
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Cliente'
*/
router.get('/', async (req, res, next) => {
    try {
        const clientes = await clienteRepository.findAll();
        res.json(clientes.map(c => c.toJSON()));
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Obtiene un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 */
router.get('/:id', async (req, res, next) => {
    try {
        const cliente = await clienteRepository.findById(parseInt(req.params.id));  
        if (!cliente) {
            return next(new NotFoundError('Cliente no encontrado'));
        }
        res.json(cliente.toJSON());
    } catch (error) {
        next(error);
    }           
}); 

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClienteInput'
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 */
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.nombre || !req.body.tipo_doc || !req.body.doc_id) {
      throw new ValidationError('Los campos nombre, tipo_doc y doc_id son obligatorios');
    }
    const newCliente = await clienteRepository.create(req.body);
    res.status(201).json(newCliente.toJSON());
    } catch (error) {
        next(error);
  }
});

/**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     summary: Actualiza un cliente existente
 *     tags: [Clientes]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ClienteInput'
 *      responses:
 *        200:
 *          description: Cliente actualizado exitosamente
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Cliente'
 */
router.put('/:id', async (req, res, next) => {
  try {
    const cliente = await clienteRepository.update(parseInt(req.params.id), req.body);
    if (!cliente) {
      return next(new NotFoundError('Cliente no encontrado'));
    }
    res.json(cliente.toJSON());
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Elimina un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID del cliente a eliminar
 *     responses:
 *       204:
 *         description: Cliente eliminado exitosamente
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await clienteRepository.delete(parseInt(req.params.id));
    if (!deleted) {
      return next(new NotFoundError('Cliente no encontrado'));
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;