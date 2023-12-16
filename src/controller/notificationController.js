import {
  getNotifications
} from "../service/notificationService.js";
const getNotificationsController = async (req, res) => {
  return await getNotifications(req, res);
};

module.exports = {
  getNotificationsController
};
