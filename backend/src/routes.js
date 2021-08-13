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
const RegistrationController = require("./controllers/RegistrationController");
const ApprovalController = require("./controllers/ApprovalController");
const RejectionController = require("./controllers/RejectionController");

// Registration
routes.post("/registration/:eventId", RegistrationController.create)
routes.get("/registration/:registrationId", RegistrationController.getRegistration)
routes.post("/registration/:registrationId/approval", ApprovalController.approval)
routes.post("/registration/:registrationId/rejection", RejectionController.rejection)

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
