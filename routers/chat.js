require("dotenv").config();
const { log } = require("console");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Message = require("../models/message");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const conn = require("../partials/connection_mysql");
const http = require("http");
const router = express.Router();

const dossier_form = path.join(__dirname, "..", "views");
router.use(express.static(dossier_form));
router.use(express.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.render("ChatIndex");
});

router.get("/:roomId", async (req, res) => {
  const roomId = req.params.roomId;
  const token = req.cookies.token_access;
  const userData = jwt.decode(token);
  const MessagesFiles = await Message.find({ roomId: roomId });
  const users = await User.find();
  res.render("ChatPage", {
    roomId: req.params.roomId,
    user: userData.username,
    usersList: users,
    Messages: MessagesFiles,
  });
});

router.get("/:roomId/:userId", async (req, res) => {
  const roomId = req.params.roomId;
  const token = req.cookies.token_access;
  const userData = jwt.decode(token);
  const otherUserId = req.params.userId;
  const privateRoomId = `${roomId}-${otherUserId}`;
  const MessagesFiles = await Message.find({ roomId: privateRoomId });
  const users = await User.find();
  res.render("ChatPage", {
    roomId: privateRoomId,
    user: userData.username,
    usersList: users,
    Messages: MessagesFiles,
  });
});

module.exports = (io) => {
  io.on("connection", (socket) => {
    const token = socket.request.headers.cookie
      .split("; ")
      .find((row) => row.startsWith("token_access="))
      ?.split("=")[1];
    const userData = jwt.decode(token);
    socket.on("join room", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
      socket.on("chat message", async (msg) => {
        io.to(roomId).emit("chat message", {
          username: userData.username,
          message: msg,
        });
        try {
          const Newmessage = new Message({
            roomId: String(roomId),
            username: String(userData.username),
            message: String(msg),
          });
          await Newmessage.save();
          const query =
            "INSERT INTO messages (id,roomId, username, message) VALUES (? ,?, ?, ?)";
          conn.query(
            query,
            [String(Newmessage._id),String(roomId), String(userData.username), String(msg)],
            (err, result) => {
              if (err) {
                console.error(`Error during insertion: ${err.message}`);
                return;
              }
              console.log("Message added successfully");
            }
          );
        } catch (error) {
          console.log("Error: " + error);
        }
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  });

  return router;
};
