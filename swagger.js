const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Azure OCR API",
            version: "1.0.0",
            description: "API for extracting and processing text using Azure OCR",
        },
        servers: [
            {
                url: 'http://localhost:3000', 
                description: 'Local server'
            },
            {
                url: 'http://137.184.101.63:3000', 
                description: 'Digital Ocean server'
            },
        ],
    },
    apis: ["./routes/*.js"], // Path to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
