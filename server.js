const express = require('express');
const multer = require('multer');
const path = require('path');
const worker = require('./worker/worker'); // Import worker thread script

const app = express();

// Configure multer for file upload
const upload = multer({ storage: path.join(__dirname, 'uploads') });


app.post('/upload', upload.single('datasheet'), async (req, res) => {
    const filePath = req.file.path;
  
    try {
      await worker(filePath);
      res.status(200).json({ message: 'CSV upload successful!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error during upload' });
    } finally {
      // Clean up uploaded file (optional)
      fs.unlink(filePath, (err) => {
        if (err) console.error(err);
      });
    }
  });
  
  // Start the server
  const port = process.env.PORT || 5000; // Use environment variable or default port
  app.listen(port, () => console.log(`Server listening on port ${port}`));
    