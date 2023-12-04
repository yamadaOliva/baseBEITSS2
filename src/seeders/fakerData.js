import mongoose from "mongoose";
require;
import User from "../models/user.js";
import Product from "../models/Product.js";
import Image from "../models/Image.js";
import Moduless from "../models/Moduless.js";
const { faker } = require("@faker-js/faker");
mongoose.connect("mongodb+srv://kien2572001:fEDmCm4G8swhO1B9@itss2.gixbqiu.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const seedUsers = async () => {
    const users = [];
    for (let i = 0; i < 2; i++) {
        users.push({
        id: i,
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: "123456",
        fullname: faker.person.fullName(),
        role: Math.floor(Math.random() * 2),
        });
    }
    await User.insertMany(users);
    }
const seedData = async () => {
  await seedUsers();
  //read
    const users = await User.find();
    console.log(users);
  mongoose.connection.close();
  console.log("Seeding completed");
};
export default seedData;
// Run the following command to seed data:
