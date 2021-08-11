const express = require("express");
const multer = require("multer");

const routes = express.Router();

const uploadConfig = require("./config/upload");
const upload = multer(uploadConfig);

// Controllers
const UserController = require("./controllers/UserController");
const EventController = require("./controllers/EventController");

// User
routes.post("/user/register", UserController.register);
routes.get("/user/:userId", UserController.getUserById);

// Event
routes.post("/event", upload.single("thumbnail"), EventController.createEvent);
routes.get("/event/:eventId", EventController.getEventById);

module.exports = routes;
