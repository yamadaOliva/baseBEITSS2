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
const getNRandom = (arr, n) => {
  const result = [];
  let tmp = [...arr];
  for (let i = 0; i < n; i++) {
    const random = Math.floor(Math.random() * tmp.length);
    result.push(tmp[random]);
    tmp.splice(random, 1);
  }
  return result;
};

const seedStores = async () => {
  // Delete all documents from Moduless collection
  const fs = require("fs");
  const data = fs.readFileSync("./src/seeders/store.json", "utf8");
  const dataTest = JSON.parse(data);
  let storeData = dataTest?.store;
  let productData = dataTest?.product;
  let storeImage = dataTest?.storeImage;
  let productImage = dataTest?.productImage;
  await Store.deleteMany();
  productData = productData.map((product) => {
    product.images = getNRandom(productImage, 5+Math.floor(Math.random() * 5));
    return product;
  });
  storeData = storeData.map((store) => {
    store.images = getNRandom(storeImage, 5+Math.floor(Math.random() * 5));
    store.products = getNRandom(productData, 10);
    store.rating = 5;
    return store;
  });
  console.log(storeData);
  await Store.insertMany(storeData);
};
const seedData = async () => {
  await seedUsers();
  await seedStores();
  //read
  console.log("Seeding completed");
  await mongoose.disconnect();
  process.exit(0);
};
export default seedData;
// Run the following command to seed data:
