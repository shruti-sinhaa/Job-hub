const User = require("../models/User");
const { hashPassword, verifyPassword } = require("../utils/hash");
const { generateToken } = require("../utils/jwt");

const userResolver = {
  Query: {
    getUserProfile: async (_, { id }) => {
      return await User.findById(id);
    },
  },
  Mutation: {
    register: async (_, { username, email, password, role }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User with this email already exists.");
      }

      const hashedPassword = await hashPassword(password);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
      });
      const savedUser = await newUser.save();

      const token = generateToken(savedUser);
      return {
        id: savedUser._id.toString(),
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role,
        token,
      };
    },


    login: async (_, { email, password }) => {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid credentials.");
      }

      // Verify the password
      const isPasswordValid = await verifyPassword(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid credentials.");
      }

      // Generate a JWT token
      const token = generateToken(user);

      // Return the user with all required fields, including `id`
      return {
        id: user._id.toString(), // Convert `_id` (ObjectId) to string
        username: user.username,
        email: user.email,
        role: user.role,
        token,
      };
    },
  },
};

module.exports = userResolver;
