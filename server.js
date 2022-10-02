import app from "./app.js";
import { config } from "dotenv";
import connectDB from "./config/db.js";

// Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to Uncaught Exception.");
  server.close(() => {
    process.exit(1);
  });
});

config({path: "./config/config.env"});

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is up and running at port http://localhost:${PORT}`);
});

// Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to unhandled promise rejection.");

  server.close(() => {
    process.exit(1);
  });
});