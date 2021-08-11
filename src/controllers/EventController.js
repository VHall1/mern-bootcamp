const Event = require("../models/Event");
const User = require("../models/User");

module.exports = {
  async createEvent(req, res) {
    const { title, description, price } = req.body;
    const { user_id: userId } = req.headers;
    const { filename: fileName } = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const event = await Event.create({
      title,
      description,
      price: parseFloat(price),
      thumbnail: fileName,
      user: userId,
    });

    return res.json(event);
  },

  async getEventById(req, res) {
    const { eventId } = req.params;

    try {
      const event = await Event.findById(eventId);

      if (event) {
        return res.json(event);
      }
    } catch (error) {
      return res.status(400).json({ message: "Event does not exist" });
    }
  },
};
