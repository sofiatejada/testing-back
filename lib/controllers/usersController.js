const { Router } = require('express');
const User = require('../models/User.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const allUsers = await User.getAll();

      res.send(allUsers);
    } catch (error) {
      next(error)
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { token } = req.body;

      const updateUser = await User.updateById(id, {token});

      res.send(updateUser)
    } catch (error) {
      next(error)
    }
  });
