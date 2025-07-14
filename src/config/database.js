const mongoose = require("mongoose");

const connectDB = async () => {
  // Connect to MongoDB using Mongoose returns Promise
  await mongoose.connect(
    "mongodb+srv://dishajatkar:Disha123@node-project.dfauof7.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
