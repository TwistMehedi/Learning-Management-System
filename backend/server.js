// server.js
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { app } from "./index.js";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

const server = http.createServer(app);

// Socket.IO instance
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("joinRoom", ({ userId }) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    console.log(`Message from ${senderId} to ${receiverId}: ${message}`);

    // Send message to receiver
    io.to(receiverId).emit("receiveMessage", {
      senderId,
      message,
    });

    // Optional: notification event
    io.to(receiverId).emit("receiveNotification", {
      type: "new_message",
      from: senderId,
      message,
    });
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
