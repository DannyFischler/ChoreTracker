const { user, Chore } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await user.find();
        return users;
      } catch (error) {
        throw new Error("Error fetching users");
      }
    },
    chores: async (_, { parent_id }) => {
      try {
        const chores = await Chore.find({ parent_id });
        return chores;
      } catch (error) {
        console.error("Error fetching chores:", error);
        throw new Error("Error fetching chores");
      }
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password, parentId }) => {
      const existingUser = await user.findOne({ username });
      if (existingUser) {
        throw new Error("Username already exists");
      }
      const newUser = await user.create({
        username,
        email,
        password,
        parentId,
      });
      const token = jwt.sign({ userId: newUser.id }, "your-secret-key", {
        expiresIn: "1h",
      });
      return { token, user: newUser };
    },

    CreateChildAccount: async (_, { username, password }) => {
      const existingUser = await user.findOne({ username });
      if (existingUser) {
        throw new Error("Username already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const childUser = new user({
        username,
        password: hashedPassword,
        parentId,
      });

      await childUser.save();

      const token = jwt.sign({ userId: childUser.id }, "your-secret-key", {
        expiresIn: "1h",
      });

      return { token, user: childUser };
    },

    login: async (_, { username, password }) => {
      try {
        const existingUser = await user.findOne({ username });

        if (!existingUser) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          existingUser.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        const token = jwt.sign(
          { userId: existingUser.id, parentId: existingUser.parentId },
          "your-secret-key",
          {
            expiresIn: "1h",
          }
        );
        return { token, user: existingUser };
      } catch (error) {
        throw new Error("Login failed");
      }
    },

    updateChore: async (_, { id }) => {
      try {
        const updatedChore = await Chore.findByIdAndUpdate(
          { _id: id },
          { isCompleted: true },
          { new: true }
        );
        if (!updatedChore) {
          throw new Error("Chore not found");
        }
        return updatedChore;
      } catch (error) {
        throw new Error("Error updating chore");
      }
    },

    deleteChore: async (_, { id }) => {
      try {
        const deletedChore = await Chore.findByIdAndDelete(id);
        if (!deletedChore) {
          throw new Error("Chore not found");
        }
        return deletedChore;
      } catch (error) {
        throw new Error("Error deleting chore");
      }
    },

    saveChore: async (_, { chore_name, amount }) => {
      const newChore = new Chore({
        chore_name,
        amount,
      });
      await newChore.save();
      return newChore;
    },
  },
};

module.exports = resolvers;
