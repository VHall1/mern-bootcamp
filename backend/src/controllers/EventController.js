const Event = require("../models/Event");
const User = require("../models/User");

module.exports = {
  async createEvent(req, res) {
    const { title, description, price, sport } = req.body;
    const { user_id: userId } = req.headers;
    const { filename: fileName } = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    try {
      const event = await Event.create({
        title,
        description,
        sport: sport.toLowerCase(),
        price: parseFloat(price),
        thumbnail: fileName,
        user: userId,
      });

      return res.json(event);
    } catch (error) {
      console.error(`Had an error while creating a new event: ${error}`);
      return res.status(400).json({
        message: "There was an error creating this event. Please try again!",
      });
    }
  },

  async deleteEvent(req, res) {
    const { eventId } = req.params;

    try {
      await Event.findByIdAndDelete(eventId);
      return res.status(204).send();
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Couldn't find any event with that ID" });
    }
  },
};
