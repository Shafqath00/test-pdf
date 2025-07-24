// server.js

// Import necessary modules
const express = require('express');
const PDFDocument = require('pdfkit');
const path = require('path');

// Initialize the Express application
const app = express();
const port = 3000; // Define the port for the server

// Serve static files from the 'public' directory
// This allows your index.html file to be accessed
app.use(express.static(path.join(__dirname, 'public')));

// Define a GET route for generating and downloading the PDF
app.get('/download-pdf', (req, res) => {
    // Create a new PDF document
    const doc = new PDFDocument();

    // Set the response headers for PDF download
    // 'Content-Type': 'application/pdf' tells the browser it's a PDF file
    // 'Content-Disposition': 'attachment; filename="sample.pdf"' tells the browser to
    // download the file and suggests a filename 'sample.pdf'
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="sample.pdf"');

    // Pipe the PDF document to the response stream
    // This sends the generated PDF data directly to the client
    doc.pipe(res);

    // Add content to the PDF
    doc.fontSize(25).text('Hello, PDFKit!', 100, 100); // Add a title
    doc.fontSize(12).text('This is a simple PDF generated using Node.js and PDFKit.', 100, 150);

    // You can add more content here, for example:
    doc.moveDown(); // Move cursor down
    doc.text('Here is some more text.');
    doc.list(['Item 1', 'Item 2', 'Item 3'], 100, 250); // Add a list

    // Finalize the PDF and end the stream
    // This must be called after all content has been added
    doc.end();
});

// Start the server and listen for incoming requests
app.listen(port, () => {
    console.log(`PDF download app listening at http://localhost:${port}`);
    console.log(`Open http://localhost:${port} in your browser to access the app.`);
});
