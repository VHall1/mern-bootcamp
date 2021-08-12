const Registration = require("../models/Registration");
const Event = require("../models/Event");

module.exports = {
  async create(req, res) {
    const { user_id: userId } = req.headers;
    const { eventId } = req.params;
    const { date } = req.body;

    const registration = await Registration.create({
      user: userId,
      event: eventId,
      date,
    });

    await registration
      .populate("event")
      .populate("user", "-password")
      .execPopulate();

    return res.json(registration);
  },

  async getRegistration(req, res) {
    const { registrationId } = req.params;

    try {
      const registration = await Registration.findById(registrationId);

      await registration
        .populate("event")
        .populate("user", "-password")
        .execPopulate();

      return res.json(registration);
    } catch (error) {
      return res.status(400).json({ message: "Registration not found" });
    }
  },
};
