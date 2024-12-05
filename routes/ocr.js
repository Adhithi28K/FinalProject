const express = require("express");
const multer = require("multer");
const ocrController = require("../controllers/ocrController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * /api/ocr/:
 *   post:
 *     summary: Process an image to extract text
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Extracted text returned successfully.
 */

// This is Base route for processing an image
router.post("/", upload.single("file"), ocrController.processImage);

/**
 * @swagger
 * /api/ocr/status:
 *   get:
 *     summary: Get API status
 *     responses:
 *       200:
 *         description: Returns API status.
 */

// This is Status route to get te=he status of api
router.get("/status", ocrController.getApiStatus);

/**
 * @swagger
 * /api/ocr/extract-region:
 *   post:
 *     summary: Extract text from a specific region in an uploaded image
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               x:
 *                 type: integer
 *               y:
 *                 type: integer
 *               width:
 *                 type: integer
 *               height:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Extracted text from the specified region.
 */

// This is /extract-region Route for extracting text from a specific region
router.post("/extract-region", upload.single("file"), ocrController.extractRegion);

/**
 * @swagger
 * /api/ocr/reverse-text:
 *   post:
 *     summary: Reverse text extracted from an uploaded image
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Reversed text returned successfully.
 */

// This is /reverse-text Route for extracting text then reverse it from a file
router.post("/reverse-text", upload.single("file"), ocrController.reverseText);

module.exports = router;
