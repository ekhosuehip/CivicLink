import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";
import Message from "../models/Message";
import Chat from "../models/Chat";

export const sendMessage = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { content, chatId} = req.body

    if (!content || !chatId) {
        res.status(400).json({
            success: false,
            message: 'Invalid date passed to the request'
        })
        return;
    }

    const newMessage = {
        sender: req.user!.userId,
        content: content,
        chat: chatId
    }

    try {
        let message = await Message.create(newMessage)
        console.log("Created Message:", message);
        message = await message.populate([
      { path: "sender", select: "name pic" },
      { path: "chat" },
      { path: "chat.users", select: "name pic email" }
    ]);
        await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
        res.status(201).json({
            success: true,
            message: message
        });
        console.log("populate Message:", message);
    } catch (error) {
        res.status(400).json({
            success: false,
            Error: error
        })
    }
}

export const allMessages = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const chatId = req.params.chatId
    if (!chatId) {
    res.status(400).json({
      success: false,
      message: "Chat ID is required",
    });
    return;
  }
  const chat = await Chat.findById("67f8e53c9cd7bb06aa7e7f01");
  console.log("this is chat",chat);

  try {
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name pic email")
      .populate({
        path: "chat",
        populate: {
          path: "users",
          select: "name pic email",
        },
      });

    res.status(200).json({
      success: true,
      message: messages,
    });
    return;
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching messages",
    });
    return;
  }
}