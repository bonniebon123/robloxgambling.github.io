const Game = require('../models/game');
const User = require('../models/user');

const playGame = async (req, res) => {
  const { userId, gameType, betAmount } = req.body;
  const user = await User.findById(userId);
  if (!user || user.balance < betAmount) return res.status(400).send('Insufficient balance');

  const result = Math.random() > 0.5 ? 'win' : 'lose';
  const game = new Game({ user: userId, gameType, result, amount: betAmount });
  await game.save();

  if (result === 'win') {
    user.balance += betAmount;
  } else {
    user.balance -= betAmount;
  }
  await user.save();

  res.json({ result, balance: user.balance });
};

module.exports = { playGame };

