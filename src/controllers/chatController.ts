import { Response, NextFunction } from "express";
import Chat from "../models/Chat";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export const accessChat = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const receiverId = req.query.receiverId as string;

  // Ensure receiverId is present
  if (!receiverId) {
    console.log("Receiver param not sent with request");
    res.status(400).send({ 
        success: false,
        message: "Receiver ID is required" });
    return;
  }

  try {
    // Check if chat already exists between the two users
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user!.userId } } },
        { users: { $elemMatch: { $eq: receiverId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await Chat.populate(isChat, {
        path: "latestMessage.sender",
        select: "fullName pic email", // Populate sender's details
        });

    // If chat exists, return the chat
    if (isChat.length > 0) {
      isChat = await Chat.populate(isChat, {
        path: "latestMessage.sender",
        select: "fullName pic email", 
      });
      res.status(200).json({
        success: true,
        Chat: isChat[0]
        });
      return;
    }

    // If no chat exists, create a new one
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user!.userId, receiverId],
    };

    const createdChat = await Chat.create(chatData);

    // Retrieve the newly created chat and populate necessary fields
    const fullChat = await Chat.findOne({ _id: createdChat._id })
      .populate("users", "-password")
      .populate("latestMessage");

    const newChat = await Chat.populate(fullChat, {
      path: "latestMessage.sender",
      select: "fullName pic email",
    });

    res.status(200).json({
        success: true,
        chat: newChat
    });
   return;
  } catch (error) {
    console.error(error);
    res.status(500).send({ 
        success: false,
        message: "Error creating or fetching chat", error: error });
    return
  }
};

export const fetchChat = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log("here", req.user);
    
  try {
    const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user!.userId } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    const populatedChats = await Chat.populate(chats, {
      path: "latestMessage.sender",
      select: "fullName pic email",
    });

    res.status(200).json({
        success: true,
        Chats: populatedChats
    });
    return;

  } catch (error) {
    console.error(error);
    res.status(500).send({ 
        success: false,
        message: "Error fetching chats", error: error });
    return;
  }
};

export const createGroup = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

  if (!req.body.users || !req.body.name) {
    res.status(400).send({ message: "Please Fill all the feilds" });
    return;
  }

  let users = JSON.parse(req.body.users);

  if (users.length < 2) {
    res.status(400).json({
        success: false,
        message: 'More than 2 users are required to form a group chat'
    })
    return;
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: JSON.parse(req.body.users),
      groupAdmin: req.user?.userId, 
      isGroupChat: true,

    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400).json({
        success: false,
        message: "Error creating group", error
    })
  }
}

export const renameGroup = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { chatId, chatName } = req.body;

    if (!chatId || !chatName) {
      res.status(400).json({
        success: false,
        message: "chatId and chatName are required",
      });
      return;
    }

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      res.status(404).json({
        success: false,
        message: "Chat not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: updatedChat,
    });
    return;
  } catch (error) {
    console.error("Error renaming group:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
}

export const addToGroup = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { chatId, userId } = req.body;

        const added = await Chat.findByIdAndUpdate(
            chatId,
            {$push: { users: userId },},
            {new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!added) {
            res.status(404).json({
                success: false,
                message: 'Chat not found'
            })
            return;
        }

        res.status(200).json({
            success: true,
            messahe: added
        })
    } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
}
}

export const removeFromGroup = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const { chatId, userId } = req.body;

        const removed = await Chat.findByIdAndUpdate(
            chatId,
            {$pull: { users: userId },},
            {new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!removed) {
            res.status(404).json({
                success: false,
                message: 'Chat not found'
            })
            return;
        }

        res.status(200).json({
            success: true,
            messahe: removed
        })
    } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
    }
}

