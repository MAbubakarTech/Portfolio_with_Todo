import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import Contact from "./models/Contact.js";
import todoRoutes from "./routes/todoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Node js server is running</h1>");
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  console.log("New message received");
  console.log(`From: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);

  const newContact = new Contact({
    name,
    email,
    message,
  });

  await newContact.save();

  console.log(`Successfully saved message from ${name} to MongoDB!`);
  res.status(200).json({
    success: true,
    message: "Thank you, backend received your message!",
  });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("server is happy running on port " + PORT);
    });
  } catch (error) {
    console.error("Server startup error:", error.message);
    process.exit(1);
  }
};

startServer();
