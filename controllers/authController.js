const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { withdrawRobux, depositRobux } = require('../services/robuxService');

const register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.status(201).send('User registered');
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).send('User not found');
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).send('Invalid password');
  const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
  res.json({ token });
};

const depositRobuxHandler = async (req, res) => {
  const { userId, amount } = req.body;
  try {
    await depositRobux(userId, amount);
    const user = await User.findById(userId);
    user.balance += amount;
    await user.save();
    res.send('Robux deposited successfully');
  } catch (error) {
    res.status(500).send('Error depositing Robux');
  }
};

const withdrawRobuxHandler = async (req, res) => {
  const { userId, amount } = req.body;
  try {
    const user = await User.findById(userId);
    if (user.balance < amount) return res.status(400).send('Insufficient balance');
    await withdrawRobux(userId, amount);
    user.balance -= amount;
    await user.save();
    res.send('Robux withdrawn successfully');
  } catch (error) {
    res.status(500).send('Error withdrawing Robux');
  }
};

module.exports = { register, login, depositRobuxHandler, withdrawRobuxHandler };

