const express = require('express')

const router = express.Router()

const schoolController = require('../controllers/schoolController')

/**
 * @swagger
 * /api/addSchool:
 *   post:
 *     summary: Add a new school
 *     tags: [Schools]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - latitude
 *               - longitude
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       201:
 *         description: School added successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/addSchool', schoolController.addSchool)

/**
 * @swagger
 * /api/listSchools:
 *   get:
 *     summary: List all schools sorted by proximity
 *     tags: [Schools]
 *     parameters:
 *       - in: query
 *         name: latitude
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: longitude
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of nearby schools
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   address:
 *                     type: string
 *                   latitude:
 *                     type: number
 *                   longitude:
 *                     type: number
 *                   distance:
 *                     type: number
 *       400:
 *         description: Missing coordinates
 *       500:
 *         description: Server error
 */
router.get('/listSchools', schoolController.listSchools)

module.exports = router