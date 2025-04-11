import { Server, Socket } from "socket.io";
import http from "http";

// Define user and message types
interface User {
  _id: string;
  name?: string;
}

interface Chat {
  _id: string;
  users: User[];
}

interface Message {
  _id: string;
  sender: User;
  chat: Chat;
  content: string;
  createdAt?: string;
}

export const initSocket = (server: http.Server) => {
  const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("🟢 New Socket Connected:", socket.id);

    // Setup user room based on user ID
    socket.on("setup", (userData: User) => {
      socket.join(userData._id);
      console.log("👤 User joined personal room:", userData._id);
      socket.emit("connected");
    });

    // Join a specific chat room
    socket.on("join chat", (roomId: string) => {
      socket.join(roomId);
      console.log(`💬 User joined chat room: ${roomId}`);
    });

    socket.on("myEvent", (data) => {
      console.log("Received from client:", data);
      socket.emit("serverResponse", { message: "Hello from server!" });
    });


    // Typing indicators
    socket.on("typing", (roomId: string) => {
      socket.in(roomId).emit("typing");
    });

    socket.on("stop typing", (roomId: string) => {
      socket.in(roomId).emit("stop typing");
    });

    // Handle new message
    socket.on("new message", (newMessage: Message) => {
      const chat = newMessage.chat;

      if (!chat?.users) {
        console.warn("⚠️ chat.users not defined");
        return;
      }

      chat.users.forEach((user) => {
        if (user._id === newMessage.sender._id) return;
        socket.in(user._id).emit("message received", newMessage);
      });
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("🔴 User Disconnected:", socket.id);
    });

    // Clean up setup event
    socket.off("setup", () => {
      socket.leave(socket.id);
      console.log("👤 User left personal room:", socket.id);
    });
  });
};
