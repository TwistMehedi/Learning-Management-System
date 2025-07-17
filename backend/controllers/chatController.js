import Message from "../models/message.model.js";
import TryCatch from "../utils/TryCatch.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

export const sendMessage = TryCatch(async (req, res, next) => {
  const { receiverId, message } = req.body;
  const senderId = req.user._id;

  if (!receiverId || !message) {
    return next(new ErrorHandler("Receiver and message are required", 400));
  }

  const newMessage = await Message.create({
    sender: senderId,
    receiver: receiverId,
    message,
  });

  res.status(201).json({
    success: true,
    message: "Message sent",
    data: newMessage,
  });
});

export const getMessages = TryCatch(async (req, res, next) => {
  const userId = req.user._id;
  const { withUserId } = req.query;

  const messages = await Message.find({
    $or: [
      { sender: userId, receiver: withUserId },
      { sender: withUserId, receiver: userId },
    ],
  }).sort({ createdAt: 1 });

  res.status(200).json({
    success: true,
    messages,
  });
});
