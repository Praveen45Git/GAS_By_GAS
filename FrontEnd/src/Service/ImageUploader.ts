import express, { Request, Response } from "express";
import multer from "multer";
const app = express();

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: "./public/images", // Path to save the image
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer upload
const upload = multer({ storage });

// API to handle image upload
app.post("/upload-image", upload.single("file"), (req: Request, res: Response): void => {
  if (!req.file) {
    // Handle error: No file uploaded
    res.status(400).json({ success: false, message: "No file uploaded." });
    return; // Ensure the handler ends here.
  }

  const filePath = `/images/${req.file.filename}`;
  res.status(200).json({ success: true, filePath });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
