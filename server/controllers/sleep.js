const _ = require('lodash');
const logger = require('./../common/logger');
const Sleep = require('../models/Sleep');

module.exports = {
  async addSleep(req, res, next) {
    let newSleep = null;
    logger.info(req.body);
    try {
      newSleep = await Sleep.create(req.body);
    } catch (err) {
      throw err;
    }

    res.json(newSleep);
  },

  async getSleep(req, res, next) {
    const { id } = req.query;
    const sl = await Sleep.findOne({ _id: id });
    res.json(sl);
  },

  async updateSleep(req, res) {
    const { _id } = req.body;
    await Sleep.update({ _id: _id }, req.body);
    res.json({
      status: 0
    });
  },

  async listSleep(req, res, next) {
    const sleepList = await Sleep.find();
    res.json(sleepList);
  }
};
