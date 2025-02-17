import express from "express";
import userRoutes from "../routes/userRoutes";
import cors from "cors";
import morgan from "morgan";

const app = express();

// Handle CORS requests
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP logger
app.use(morgan("combined"));

// Use the /api prefix
app.use("/api", userRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
