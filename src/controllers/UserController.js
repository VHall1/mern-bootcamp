const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  async register(req, res) {
    try {
      const { firstName, lastName, password, email } = req.body;
      const existentUser = await User.findOne({ email });

      if (!existentUser) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
          firstName,
          lastName,
          password: hashedPassword,
          email,
        });

        return res.json(user);
      }

      return res.status(400).json({
        message: "Email already exists. Would you like to login instead?",
      });
    } catch (error) {
      throw Error(`Had an error while creating new user: ${error}`);
    }
  },
};
