import bcrypt from 'bcryptjs';
import db from '../models';
import JWTmiddleware from '../middleware/JWTmiddleware.js';
//hash password
const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}

const checkUserExists = async (email) => {
    const user = await db.User.findOne({ email: email });
    return user ? true : false;
}

const registerService = async (user) => {
    console.log("service==>", user);
    const userIsExists = await checkUserExists(user.email);
    console.log("userIsExists==>", userIsExists);
    if (userIsExists) {
        return {
            EC: 400,
            EM: 'Email is already exists',
            DT: ""
        }
    } else {
        try {
            await db.User.create({
                email: user.email,
                password: hashPassword(user.password),
                username: user.username,
                role: user.role,
                name: user.name
            });
            return {
                EC: 200,
                EM: 'Register successfully',
                DT: ""
            }
        } catch (error) {
            console.log(error);
        }
    }


}

const loginService = async (user) => {
    const userIsExists = await checkUserExists(user.email);
    if (!userIsExists) {
        return {
            EC: 400,
            EM: 'Email is not exists',
            DT: ""
        }
    } else {
        const userTemp = await db.User.findOne({ email: user.email });
        // const isMatch = bcrypt.compareSync(user.password, userTemp.password);
        // Tu di ma mã hóa :))
        const isMatch = user.password.localeCompare(userTemp.password);
        if (isMatch !== 0) {
            return {
                EC: 400,
                EM: 'Password is not correct',
                DT: ""
            }
        } else {
            let token = JWTmiddleware.createToken(user);
            return {
                EC: 200,
                EM: 'Login successfully',
                DT: {
                    accessToken: token,
                    email: userTemp.email,
                    username: userTemp.username,
                    fullname: userTemp.fullname,
                    avatar: userTemp.avatar,
                    _id: userTemp._id,
                }
            }
        }
    }
}


module.exports = {
    registerService,
    loginService
}