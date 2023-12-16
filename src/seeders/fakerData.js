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
  const namesVietnamese = [
    "Nguyễn Văn An",
    "Trần Thị Bình",
    "Lê Văn Cường",
    "Phạm Thị Dung",
    "Hoàng Văn Duy",
    "Nguyễn Thị Hà",
    "Vũ Văn Hải",
    "Lê Thị Hường",
    "Đặng Văn Minh",
    "Nguyễn Thị Kiều",
  ];
  await User.deleteMany();
  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push({
      id: i,
      username: faker.internet.userName(),
      email: "user" + i + "@gmail.com",
      password: "123456",
      fullname: namesVietnamese[i],
      role: 1,
      avatar: faker.image.avatar(),
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
  let type = ["LIKE", "DISLIKE", "FEEDBACK"];
  const compliments = [
    "Cửa hàng này có những sản phẩm laptop chất lượng cao!",
    "Dịch vụ tận tâm và chuyên nghiệp, tôi rất hài lòng!",
    "Sự đa dạng về mẫu mã và thương hiệu laptop ở đây rất ấn tượng.",
    "Nhân viên thân thiện và nhiệt tình, luôn sẵn sàng giúp đỡ khách hàng.",
    "Không gian cửa hàng sạch sẽ và thoải mái, tạo cảm giác mua sắm dễ chịu.",
    "Cửa hàng này luôn cập nhật những mẫu laptop mới nhất trên thị trường.",
    "Giá cả ở đây hợp lý, đặc biệt là so với chất lượng sản phẩm.",
    "Đã mua laptop ở đây và rất hài lòng với hiệu suất và tính năng.",
    "Cửa hàng mang đến cho tôi trải nghiệm mua sắm laptop tuyệt vời.",
    "Chắc chắn sẽ quay lại đây nếu cần nâng cấp hoặc mua laptop mới.",
  ];
  let reactionData = [];
  for (let i = 0; i < 8; i++) {
    reactionData.push({
      id: i,
      user_id: i + 2,
      type: type[Math.floor(Math.random() * 3)],
      content: content[Math.floor(Math.random() * 5)],
      date: faker.date.past(),
    });
  }

  const fs = require("fs");
  const data = fs.readFileSync("./src/seeders/store.json", "utf8");
  const dataTest = JSON.parse(data);
  let storeData = dataTest?.store;
  let productData = dataTest?.product;
  let storeImage = dataTest?.storeImage;
  let productImage = dataTest?.productImage;
  let reviewData = [];
  for (let i = 0; i < 10; i++) {
    let reaction = reactionData;
    reviewData.push({
      id: i,
      user_id: i,
      content: compliments[Math.floor(Math.random() * 10)],
      rating: Math.floor(Math.random() * 5),
      reactions: reaction,
      likes: reaction.filter((item) => item.type === "LIKE").length,
      dislikes: reaction.filter((item) => item.type === "DISLIKE").length,
      feedbacks: reaction.filter((item) => item.type === "FEEDBACK").length,
      images: getNRandom(productImage, 3),
      date: faker.date.past(),
    });
  }
  await Store.deleteMany();
  productData = productData.map((product) => {
    product.images = getNRandom(
      productImage,
      5 + Math.floor(Math.random() * 5)
    );
    return product;
  });
  storeData = storeData.map((store) => {
    store.images = getNRandom(storeImage, 5 + Math.floor(Math.random() * 5));
    store.products = getNRandom(productData, 10);
    store.reviews = getNRandom(reviewData, 5);
    store.rating =
      store.reviews.reduce((acc, cur) => acc + cur.rating, 0) /
      store.reviews.length;
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
