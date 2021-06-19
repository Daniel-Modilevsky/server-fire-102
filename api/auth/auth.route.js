const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
// const swaggerJsDoc = require('swagger-jsdoc');
// router.get('/api-docs', swaggerUi.setup(swaggerJsDoc));

const {checkEmail, signup, login, getAllUsers} = require('./auth.controller');

/**
 * @swagger
 * /api/signup:
 *   post:
 *     parameters:
 *      - in: body
 *        name: User
 *        description: New User
 *        schema:
 *          type: object
 *          properties:
 *            userName:
 *              type: string
 *            password:
 *              type: string
 *            email:
 *              type: string
 *            phoneNumber:
 *              type: string
 *            identityNumer:
 *              type: string
 *     responses:
 *       200:
 *         description: Created
 */
router.post('/api/signup' , checkEmail ,signup);

/**
 * @swagger
 * /api/login:
 *   post:
 *     parameters:
 *      - in: body
 *        name: User
 *        description: Confirm User
 *        schema:
 *          type: object
 *          properties:
 *            userName:
 *              type: string
 *            password:
 *              type: string
 *     responses:
 *       200:
 *         description: Loged in
 */
 router.post('/api/login', login);

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: get all users
 *     responses:
 *       200:
 *         description: Returns users
 */
router.get('/api/users/', getAllUsers);



module.exports = router; 


