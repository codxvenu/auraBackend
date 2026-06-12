
import { Router } from "express";
import path from "path";
const router = Router();


router.post("/upload", (req, res) => {
  if (!req.files || !req.files.file) {
    throw Error("No file uploaded")
  }
  const file = req.files.file;
  const randomId = crypto.randomUUID(16).toString();
  const filename = randomId + path.extname(file.name);
  file.mv(`./uploads/${filename}`, (err) => {
    if (err) throw Error(err)
    return {status : true,filename}
  });
});


export default router;
