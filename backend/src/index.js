const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const serviceRoutes = require("./routes/services");

require("dotenv").config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.get("/", (req, res) => {
  res.send("Hello from backend");
});
app.use(cors());
app.use(express.json());
app.set("io", io);

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);

io.on("connection", () => {
  console.log("🔌 WebSocket connected");
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
