const express = require("express");
const multer = require("multer");

const routes = express.Router();

const uploadConfig = require("./config/upload");
const upload = multer(uploadConfig);

// Controllers
const UserController = require("./controllers/UserController");
const EventController = require("./controllers/EventController");
const DashboardController = require("./controllers/DashboardController");
const LoginController = require("./controllers/LoginController");

// User
routes.post("/user/register", UserController.register);
routes.get("/user/:userId", UserController.getUserById);

// Login
routes.post("/login", LoginController.login);

// Event
routes.post("/event", upload.single("thumbnail"), EventController.createEvent);
routes.delete("/event/:eventId", EventController.deleteEvent);

// Dashboard
routes.get("/event/:eventId", DashboardController.getEventById);
routes.get("/dashboard", DashboardController.getEvents);
routes.get("/dashboard/:sport", DashboardController.getEvents);

module.exports = routes;
