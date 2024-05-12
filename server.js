const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE;

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("DB Connection Established!");
  } catch (err) {
    console.error("Error connecting to database:", err.message);
    process.exit(1);
  }
};

connectDB();

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
