import "dotenv/config";
import express from "express";
import { prisma } from "./db.js";
import universalRoute from './routes/app.js';



const app = express();
app.use(express.json());


app.get("/", (_req, res) => {
  res.json({ message: "Namoh API is running", status: "ok" });
});


//Routes
app.use(universalRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export { app };
