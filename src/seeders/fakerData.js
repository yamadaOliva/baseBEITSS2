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
  for (let i = 0; i < 10; i++) {
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
  let content = ["hay", "tuyet", "tot", "xau", "binh thuong"];
  let type = ["LIKE", "DISLIKE"];
  let reactionData = [];
  for (let i = 0; i <8; i++) {
    reactionData.push({
      id: i,
      user_id: i+2,
      type: type[Math.floor(Math.random() * 2)],
      content: content[Math.floor(Math.random() * 5)],
    });
  }
  let reviewData = []; 
  for (let i = 0; i < 10; i++) {
    let reaction = getNRandom(reactionData, 5);
    reviewData.push({
      id: i,
      user_id: i,
      content: faker.lorem.paragraph(),
      rating: Math.floor(Math.random() * 5),
      reactions: reaction,
      likes: reaction.filter((item) => item.type === "LIKE").length,
      dislikes: reaction.filter((item) => item.type === "DISLIKE").length,
      images: [],
    });
  }
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
    store.reviews = getNRandom(reviewData, 5);
    store.rating = 0;
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
