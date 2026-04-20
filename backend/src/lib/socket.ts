import { Server } from "socket.io";
import http from "http";
import { envVars } from "../app/config/env";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware";
import app from "../app";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [envVars.CLIENT_URL || "http://localhost:5173"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

export function getReceiverSocketId(userId: string) {
  return userSocketMap[userId];
}

const userSocketMap: Record<string, string[] | undefined> = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.user.fullName);

  const userId = socket.userId;
  console.log(socket.id);

  if (!userSocketMap[userId]) {
    userSocketMap[userId] = [];
  }

  userSocketMap[userId].push(socket.id);

  console.log("User connected:", userId, userSocketMap[userId]);

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);
    userSocketMap[userId] = userSocketMap[userId]?.filter(
      (id) => id !== socket.id,
    );

    if (userSocketMap[userId]?.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
