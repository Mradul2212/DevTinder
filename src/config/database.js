const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://mradul2212_db_user:CRggClgmsBi5gDua@cluster0.5rty2ke.mongodb.net/DevTinder"
  );
};

module.exports = { connectDB };
