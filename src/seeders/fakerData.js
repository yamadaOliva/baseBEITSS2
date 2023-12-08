import mongoose from "mongoose";
require;
import User from "../models/User.js";
import Store from "../models/Store.js";
const { faker } = require("@faker-js/faker");
mongoose.connect(
  "mongodb+srv://kien2572001:fEDmCm4G8swhO1B9@itss2.gixbqiu.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const seedUsers = async () => {
  // Delete all documents from Moduless collection
  await User.deleteMany();
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
};
const seedStores = async () => {
  // Delete all documents from Moduless collection
  await Store.deleteMany();
  const stores = [];
  for (let i = 0; i < 2; i++) {
    stores.push({
      id: i,
      name: faker.commerce.productName(),
      address: faker.location.streetAddress(),
      description: faker.lorem.paragraph(),
      rating: Math.floor(Math.random() * 5),
      products: [],
      images: [],
      reviews: [],
    });
  }
  await Store.insertMany(stores);
}
const seedData = async () => {
  await seedUsers();
  await seedStores();
  //read
  const users = await User.find();
  const stores = await Store.find();
  console.log(stores);
  console.log(users);
  mongoose.connection.close();
  console.log("Seeding completed");
};
export default seedData;
// Run the following command to seed data:
