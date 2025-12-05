import express from "express";
import api from "./public-api";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api", api);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
