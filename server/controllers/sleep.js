const _ = require('lodash');
const Sleep = require('../models/Sleep');

module.exports = {
  async addSleep(req, res, next) {
    let newSleep = null;
    try {
      newSleep = await Sleep.create(req.body);
    } catch (err) {
      throw err;
    }

    res.json(newSleep);
  },

  async updateSleep(req, res) {
    const { sid } = req.body;
    await Sleep.update({ _id: sid }, req.body);
    res.json({
      status: 0
    });
  },

  async listSleep(req, res, next) {
    const sleepList = await Sleep.find();
    res.json(sleepList);
  }
};
