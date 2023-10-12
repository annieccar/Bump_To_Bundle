import multer from "multer";
import { v4 as uuidv4 } from "uuid";

import { fileURLToPath } from "url"; // Import the fileURLToPath function
import { dirname } from "path"; // Import the dirname function
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../../public/itemsphotos"));
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_").split(".")[0];
    const ext = MIME_TYPE[file.mimetype];
    callback(null, `${name}-${uuidv4()}.${ext}`);
  },
});

export const uploadItemPhoto = multer({ storage }).single("photo");
