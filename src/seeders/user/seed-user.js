// seed.js

const mongoose = require('mongoose');
const User = require("./User.js");

// Kết nối đến MongoDB
mongoose.connect(
  "mongodb+srv://kien2572001:fEDmCm4G8swhO1B9@itss2.gixbqiu.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// Logic tạo seed data
const seedData = [
  {
    username: 'Anh',
    email: 'anh.nv@gmail.com',
    password: '123456',
    fullname: 'Nguyen Viet Anh',
    role: Math.floor(Math.random() * 2),
    avatar: 'https://res.cloudinary.com/dm6vzyxzh/image/upload/v1688828167/chg6lnkqwhpipcy2cvzs.png',
  },
  {
    username: 'Anh Dung',
    email: 'dung@gmail.com',
    password: '123456',
    fullname: 'Le Anh Dung',
    role: Math.floor(Math.random() * 2),
    avatar: 'https://res.cloudinary.com/dm6vzyxzh/image/upload/v1688827311/epwuh4es8na01vomswpi.png',

  },
  {
    username: 'Anh Tuan',
    email: 'tuan@gmail.com',
    password: '123456',
    fullname: 'Truong Anh Tuan',
    role: Math.floor(Math.random() * 2),
    avatar: "https://res.cloudinary.com/dm6vzyxzh/image/upload/v1688825525/ekby0peuduzld6kkeypl.jpg",
  },
  {
    username: 'Kien',
    email: 'kien@gmail.com',
    password: '123456',
    fullname: 'Nguyen Trung Kien',
    role: Math.floor(Math.random() * 2),
    avatar: 'https://res.cloudinary.com/dm6vzyxzh/image/upload/v1688827915/c3ppuelyjstq72dbbfuw.png',
  },
  {
    username: 'Vinh',
    email: 'vinh@gmail.com',
    password: '123456',
    fullname: 'Phung Ngoc Vinh',
    role: Math.floor(Math.random() * 2),
    avatar: "https://res.cloudinary.com/dm6vzyxzh/image/upload/v1688824753/gw28zssnnetpj9clp23n.jpg",
  },
  {
    username: 'Tran Quang Huy',
    email: 'huy@gmail.com',
    password: '123456',
    fullname: 'Tran Quang Huy',
    role: Math.floor(Math.random() * 2),
    avatar: "https://res.cloudinary.com/dm6vzyxzh/image/upload/v1689060331/cxkuhzst7cdgbqbtqna3.gif",
  },
  {
    username: 'Nguyen Huy Hung',
    email: 'hung@gmail.com',
    password: '123456',
    fullname: 'Nguyen Huy Hung',
    role: Math.floor(Math.random() * 2),
    avatar: "https://res.cloudinary.com/dm6vzyxzh/image/upload/v1689865272/klt5xtxbvze4ghpsxsas.jpg",
  },
];

// Xóa hết dữ liệu trong MongoDB
// User.deleteMany();

// Thêm seed data vào MongoDB
User.insertMany(seedData)
  .then(() => {
    console.log('Seed data added to the database');
    // Đóng kết nối sau khi thêm dữ liệu
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error seeding data:', err);
    // Đóng kết nối nếu có lỗi
    mongoose.connection.close();
  });

// Get all data user

// const getAllUser = async () => {
//   try {
//     const users = await User.find({});
//     return users;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     throw error; // Đảm bảo rằng lỗi được truyền xuống
//   }
// }

// // Sử dụng await trong một hàm async
// async function fetchData() {
//   try {
//     const users = await getAllUser();
//     // Bạn có thể thực hiện các thao tác khác sau khi lấy dữ liệu
//     console.log('Data:', users);
//   } catch (error) {
//     // Xử lý lỗi nếu có
//     console.error('Error:', error);
//   }
//   mongoose.connection.close();
// }

// // Gọi hàm fetchData để sử dụng await
// fetchData();