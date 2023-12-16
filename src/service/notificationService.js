import db from '../models';

async function createNotification({ recipient, sender, message, store }) {
  try {
    const notification = await db.Notification.create({
      recipient,
      sender,
      message,
      store
    });
    const populatedNotification = await notification
      .populate('sender store')
      return populatedNotification;
    } catch (error) {
      console.log(error);
  }
}

async function getNotifications(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const userId = req.query.user;
  try {
    const notifications = await db.Notification.find({ recipient: userId })
      .populate('sender store')
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });
    res.json(notifications)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

async function getUnreadNotifications(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const userId = req.query.user;
  
  try {
    const notifications = await Notification.find({
      recipient: userId,
      read: false,
    })
      .populate('sender store')
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

module.exports = {
  createNotification,
  getNotifications,
  getUnreadNotifications,
};
