//package import
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// console.log(__filename, __dirname);

//files import
import connectDB from "./config/db.js";

//routes import
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/usersRoute.js";
import postRoute from "./routes/postsRoute.js";
import commentRoute from "./routes/commentsRoute.js";

//dotenv configuration
dotenv.config();

//database connection
connectDB();

//express app
const app = express();

//Middlewares

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5174", credentials: true }));
app.use(morgan("common"));

//App Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

//Image upload
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
    // fn(null, "image11.jpg");
  },
});

//multer instance
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json("Image has been uploaded successfully");
  } catch (error) {
    res.status(500).json("Error while uploading");
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `NOde Server running In ${process.env.DEV_MODE} on port ${PORT}`.bgCyan
      .white
  );
});
