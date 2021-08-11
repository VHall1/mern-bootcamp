const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(200).json({ message: "Required field missing" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(200).json({
          message: "User not found! Do you want to register instead?",
        });
      }

      if (await bcrypt.compare(password, user.password)) {
        // login user
        const userResponse = {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };

        return res.json(userResponse);
      }

      return res.status(200).json({
        message: "Either email or password were not found",
      });
    } catch (error) {
      throw Error(`Had an error while authenticating an user: ${error}`);
    }
  },
};
