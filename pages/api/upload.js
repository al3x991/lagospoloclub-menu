import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), "public"); // Specify the public folder as the upload directory

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "File upload failed." });
      }

      const { file } = files;

      if (!file) {
        return res.status(400).json({ error: "No file uploaded." });
      }

      if (file.type !== "application/pdf") {
        fs.unlinkSync(file.path);
        return res
          .status(400)
          .json({ error: "Invalid file type. Only PDF files are allowed." });
      }

      const oldPath = file.path;
      const newPath = path.join(process.cwd(), "public", "menu.pdf"); // Save the file as "menu.pdf" in the public folder

      fs.rename(oldPath, newPath, (renameErr) => {
        if (renameErr) {
          return res.status(500).json({ error: "File save failed." });
        }

        return res
          .status(200)
          .json({ message: "File uploaded and saved as menu.pdf." });
      });
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
