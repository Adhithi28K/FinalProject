# Azure OCR API

## Overview
Welcome to the Azure OCR API, a robust and efficient tool to process images and extract text using Azure Cognitive Services. This API is designed to help developers integrate Optical Character Recognition (OCR) into their projects with ease.

## Features
- Extract text from images (`POST /api/ocr/`).
- Analyze specific regions of an image for text (`POST /api/ocr/extract-region`).
- Reverse the extracted text (`POST /api/ocr/reverse-text`).
- Check the API status and uptime (`GET /api/ocr/status`).
- Fully documented with interactive Swagger UI.

## Live Demo
- **Swagger UI**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Table of Contents
1. [Project Setup](#project-setup)
2. [API Endpoints](#api-endpoints)
3. [Error Handling](#error-handling)
4. [Usage Examples](#usage-examples)
5. [Environment Variables](#environment-variables)
6. [Testing](#testing)
7. [Technologies Used](#technologies-used)
8. [FAQ](#faq)
9. [Acknowledgements](#acknowledgements)

---

## Project Setup

### Prerequisites
- **Node.js** and **npm** installed.
- Azure Cognitive Services OCR subscription.
- Git installed for version control.

### Installation
1. Clone the repository:
   ```bash
   git clone <your_repo_url>
   cd azure-ocr-api

