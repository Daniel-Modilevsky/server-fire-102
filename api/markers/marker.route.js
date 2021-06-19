const express = require('express');
const {checkMarkerId,
    getMarkers,
    getMarker,
    createMarker,
    unActiveMarker,
    deleteMarker,
} = require('./marker.controller');

let router = express.Router();
const upload = require('../../lib/images');


/**
 * @swagger
 * /api/markers:
 *   get:
 *     description: get all Markers
 *     responses:
 *       200:
 *         description: Returns Markers
 */
router.get('/api/markers', getMarkers); 



/**
 * @swagger
 * /api/markers:
 *   post:
 *     parameters:
 *      - in: body
 *        name: Marker
 *        description: New Marker
 *        schema:
 *          type: object
 *          properties:
 *            key:
 *              type: string
 *            displayName:
 *              type: string
 *            coordinate:
 *              type: object
 *              properties:
 *                latitude: 
 *                  type: number
 *                longitude: 
 *                  type: number
 *     responses:
 *       200:
 *         description: Created
 */
router.post('/api/markers', createMarker); 

/**
 * @swagger
 * /api/markers/{id}:
 *   put:
 *     summary: change marker to be un available.
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Returns marker
 */
router.put('/api/markers/:id',checkMarkerId, unActiveMarker); 


router.get('/api/markers/:id',checkMarkerId, getMarker); 
router.delete('/api/markers/:id',checkMarkerId, deleteMarker); 

module.exports = router;