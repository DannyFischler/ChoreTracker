const { user, Chore } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await user.find();
        return users;
      } catch (error) {
        throw new Error('Error fetching users');
      }
    },
    chores: async (_, { parent_id }) => {
      try {
        const chores = await Chore.find({ parent_id });
        return chores;
      } catch (error) {
        console.error('Error fetching chores:', error);
        throw new Error('Error fetching chores');
      }
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const existingUser = await user.findOne({ username });
      if (existingUser) {
        throw new Error('Username already exists');
      }
      const newUser = await user.create({ username, email, password });
      const token = jwt.sign({ userId: newUser.id }, 'your-secret-key', { expiresIn: '1h' });
      return { token, user: newUser };
    },

    CreateChildAccount: async (_, { username, password }) => {
      const existingUser = await user.findOne({ username });
      if (existingUser) {
        throw new Error('Username already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const childUser = new user({
        username,
        password: hashedPassword,
        isChild: true,
      });

      await childUser.save();

      const token = jwt.sign({ userId: childUser.id }, 'your-secret-key', { expiresIn: '1h' });

      return { token, user: childUser };
    },

    login: async (_, { username, password }) => {
      try {
        const existingUser = await user.findOne({ username });

        if (!existingUser) {
          throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        const token = jwt.sign({ userId: existingUser.id }, 'your-secret-key', { expiresIn: '1h' });
        return { token, user: existingUser };
      } catch (error) {
        throw new Error('Login failed');
      }
    },

    updateChore: async (_, { id, date_approved, date_completed, parent_comments, child_comments }) => {
      try {
        const updatedChore = await Chore.findByIdAndUpdate(
          id,
          { date_approved, date_completed, parent_comments, child_comments },
          { new: true }
        );
        if (!updatedChore) {
          throw new Error('Chore not found');
        }
        return updatedChore;
      } catch (error) {
        throw new Error('Error updating chore');
      }
    },

    deleteChore: async (_, { id }) => {
      try {
        const deletedChore = await Chore.findByIdAndDelete(id);
        if (!deletedChore) {
          throw new Error('Chore not found');
        }
        return deletedChore;
      } catch (error) {
        throw new Error('Error deleting chore');
      }
    },

    saveChore: async (_, { id, choreId, date_approved, date_completed }) => {
      try {
        const savedChore = await Chore.findByIdAndUpdate(
          id,
          { choreId, date_approved, date_completed },
          { new: true }
        );
        if (!savedChore) {
          throw new Error('Chore not found');
        }
        return savedChore;
      } catch (error) {
        throw new Error('Error saving chore');
      }
    },
  },
};

module.exports = resolvers;
