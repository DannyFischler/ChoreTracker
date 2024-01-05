const { user, Chore } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error('Error fetching users');
      }
    },
    chores: async () => {
      try {
        const chores = await Chore.find();
        return chores;
      } catch (error) {
        throw new Error('Error fetching chores');
      }
    },
    chore: async (_, { id }) => {
      try {
        const chore = await Chore.findById(id);
        if (!chore) {
          throw new Error('Chore not found');
        }
        return chore;
      } catch (error) {
        throw new Error('Error fetching chore by ID');
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
    

    createChore: async (_, { parent_id, chore_name, amount }) => {
      try {
        const newChore = await Chore.create({ parent_id, chore_name, amount });
        return newChore;
      } catch (error) {
        throw new Error('Error creating chore');
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
    login: async (_, { username, password }) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
        return token;
      } catch (error) {
        throw new Error('Login failed');
      }
    },
  },
};

module.exports = resolvers;
