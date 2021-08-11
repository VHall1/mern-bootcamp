const Event = require("../models/Event");

module.exports = {
  async getEventById(req, res) {
    const { eventId } = req.params;

    try {
      const event = await Event.findById(eventId);

      if (event) {
        return res.json(event);
      }

      return res.status(400).json({ message: "Event does not exist" });
    } catch (error) {
      console.error(`Had an error while fetching an event: ${error}`);
      return res
        .status(400)
        .json({ message: "There was an error fetching this event" });
    }
  },

  async getEvents(req, res) {
    const { sport } = req.params;
    const query = sport ? { sport } : {};

    try {
      const events = await Event.find(query);

      if (events?.length) {
        return res.json(events);
      }

      return res.status(400).json({ message: "We don't have any events yet!" });
    } catch (error) {
      console.error(`Had an error while fetching events: ${error}`);
      return res
        .status(400)
        .json({ message: "There was an error fetching events" });
    }
  },
};
