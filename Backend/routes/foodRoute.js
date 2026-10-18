import express from "express";
import { addFood ,listFood,removeFood} from "../controlers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image Storage engine
const storage = multer.diskStorage({
  destination: "uploads", // make sure this folder exists
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Use the upload middleware here
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);

export default foodRouter;
