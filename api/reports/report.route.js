const express = require('express');
const { checkReportId,
    getAllReports,
    getReport,
    createReport,
    unActiveReport,
    deleteReport,
} = require('./report.controller');

let router = express.Router();
// const upload = require('../../lib/images');


/**
 * @swagger
 * /api/reports:
 *   get:
 *     description: get all Reports
 *     responses:
 *       200:
 *         description: Returns Reports
 */
router.get('/api/reports', getAllReports); 


/**
 * @swagger
 * /api/reports:
 *   post:
 *     parameters:
 *      - in: body
 *        name: Report
 *        description: New Report
 *        schema:
 *          type: object
 *          properties:
 *            userName:
 *              type: string
 *            phoneNumber:
 *              type: string
 *            type:
 *              type: string
 *            time:
 *              type: string
 *            comment:
 *              type: string
 *            image:
 *              type: string
 *            marker:
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
router.post('/api/reports', createReport); 
// router.post('/api/reports', upload.single('image'), createReport); 


/**
 * @swagger
 * /api/reports/{id}:
 *   put:
 *     summary: change report to be un available.
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Returns Report
 */
router.put('/api/reports/:id',checkReportId, unActiveReport); 
router.get('/api/reports/:id',checkReportId, getReport); 
router.delete('/api/reports/:id',checkReportId, deleteReport); 

module.exports = router;