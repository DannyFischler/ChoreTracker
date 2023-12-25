// server/controllers/userController.js
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user = new User({ username, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error in creating user' });
  }
};

exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  exports.createChildAccount = async (req, res) => {
    try {
      const { username, password, parentId } = req.body;
      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ message: 'Username already taken' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
      const childUser = new User({
        username,
        password: hashedPassword,
        isChild: true,
        parent: parentId
      });
  
      await childUser.save();
      res.status(201).json({ message: 'Child account created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error in creating child account' });
    }
  };
  