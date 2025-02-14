import express from "express";
import userRoutes from "../routes/userRoutes";
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the /api prefix
app.use("/api", userRoutes);

// HTTP logger
app.use(morgan("combined"));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
