const mongoose = require('mongoose');

const connect = () => {
  mongoose.connect('mongodb://localhost:27017/gambling', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connect };
