const fs = require("fs");
const axios = require("axios");

//#1 Process an image with the Azure OCR API
exports.processImage = async (req, res) => {
    const { file } = req;
    if (!file) {
        return res.status(400).send("No file uploaded.");
    }

    try {
        // We Read the uploaded file
        const imageBuffer = fs.readFileSync(file.path);

        // Call Azure OCR API
        const response = await axios.post(
            `${process.env.AZURE_ENDPOINT}/vision/v3.2/ocr`,
            imageBuffer,
            {
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.AZURE_API_KEY,
                    "Content-Type": "application/octet-stream",
                },
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error processing image.");
    } finally {
        // Clean up the uploaded file
        fs.unlinkSync(file.path);
    }
};

//#2 API status handler
exports.getApiStatus = (req, res) => {
    res.status(200).json({
        status: "API is running",
        uptime: `${process.uptime().toFixed(2)} seconds`,
        memoryUsage: process.memoryUsage(),
        timestamp: new Date().toISOString(),
    });
};

//#3 Extract text from a specific region
exports.extractRegion = async (req, res) => {
    const { file } = req;
    const { x, y, width, height } = req.body;

    if (!file) return res.status(400).json({ error: "No file uploaded. Please upload an image." });
    if (!x || !y || !width || !height) {
        return res.status(400).json({ error: "x, y, width, and height parameters are required." });
    }

    try {
        // Read the uploaded file
        const imageBuffer = fs.readFileSync(file.path);

        // Call Azure OCR API
        const response = await axios.post(
            `${process.env.AZURE_ENDPOINT}/vision/v3.2/ocr`,
            imageBuffer,
            {
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.AZURE_API_KEY,
                    "Content-Type": "application/octet-stream",
                },
            }
        );

        const regions = response.data.regions;
        let extractedText = "";
        regions.forEach(region => {
            const boundingBox = region.boundingBox.split(",");
            const [regionX, regionY, regionWidth, regionHeight] = boundingBox.map(Number);

            if (
                regionX < x + width &&
                regionX + regionWidth > x &&
                regionY < y + height &&
                regionY + regionHeight > y
            ) {
                extractedText += region.lines
                    .map(line => line.words.map(word => word.text).join(" "))
                    .join("\n");
            }
        });

        res.status(200).json({
            extractedText: extractedText || "No text found in the specified region.",
        });
    } catch (error) {
        console.error("Error in extractRegion:", error.message);
        res.status(500).json({ error: "Failed to process the image. Please try again." });
    } finally {
        fs.unlinkSync(file.path);
    }
};

//#4 ReverseText post extraction
exports.reverseText = async (req, res) => {
    const { file } = req;

    if (!file) {
        return res.status(400).json({ error: "No file uploaded. Please upload an image." });
    }

    try {
        // Read the uploaded file
        const imageBuffer = fs.readFileSync(file.path);

        // Call Azure OCR API to extract text
        const ocrResponse = await axios.post(
            `${process.env.AZURE_ENDPOINT}/vision/v3.2/ocr`,
            imageBuffer,
            {
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.AZURE_API_KEY,
                    "Content-Type": "application/octet-stream",
                },
            }
        );

        // Extract text
        const extractedText = ocrResponse.data.regions
            .map(region => region.lines.map(line => line.words.map(word => word.text).join(" ")).join("\n"))
            .join("\n");

        if (!extractedText) {
            return res.status(200).json({ message: "No text detected in the image." });
        }

        // Reverse the text
        const reversedText = extractedText.split("").reverse().join("");

        res.status(200).json({
            originalText: extractedText,
            reversedText,
        });
    } catch (error) {
        console.error("Error in reverseText:", error.message);
        res.status(500).json({ error: "Failed to process the image. Please try again." });
    } finally {
        fs.unlinkSync(file.path);
    }
};

