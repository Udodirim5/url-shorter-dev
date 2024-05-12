const express = require('express');

const userController = require('../controllers/usersController');

const router = express.Router();


// THIS IS WHERE THE ROUTE FOR THE USERS ARE HANDLED
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.removeUser);

module.exports = router;
