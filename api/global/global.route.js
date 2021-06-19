const express = require('express');
const router = express.Router();
const { index, routeInvalid, errorHandler, method } = require('./global.controller');

router.use(method);


/**
 * @swagger
 * /:
 *   get:
 *     description: global
 *     responses:
 *       200:
 *         description: Returns massage
 */
router.get('/', index);
router.all('*', routeInvalid);
router.use(errorHandler);

module.exports = router; 


