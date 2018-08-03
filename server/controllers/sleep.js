const _ = require('lodash');
const Validator = require('validator-core');
const logger = require('./../common/logger');
const Sleep = require('../models/Sleep');

const formValid = body => {
  const ruleset = [
    {
      name: 'authorName',
      rules: ['size:0-48'],
      tips: ['author_name err']
    },
    {
      name: 'date',
      rules: ['size:1-10', /^\d{4}-\d{2}-\d{2}$/],
      tips: ['date err', 'date format err, must be YYYY-MM-DD']
    },
    {
      name: 'mark',
      rules: ['size:1-48'],
      tips: ['mark err']
    },
    {
      name: 'serious',
      rules: ['in:-1,0,1,2,3'],
      tips: ['serious err']
    },
    {
      name: 'hunger',
      rules: ['in:-1,0,1,2,3'],
      tips: ['hunger err']
    },
    {
      name: 'san',
      rules: ['in:-1,0,1,2,3'],
      tips: ['san err']
    },
    {
      name: 'hp',
      rules: ['in:-1,0,1,2,3'],
      tips: ['hp err']
    },
    {
      name: 'freeTime',
      rules: ['size:1-48'],
      tips: ['freeTime err']
    },
    {
      name: 'sleepTime',
      rules: ['size:1-48'],
      tips: ['sleepTime err']
    },
    // {
    //   name: 'hasImportantThing',
    //   rules: ['in:0,1'],
    //   tips: ['hasImportantThing err']
    // },
    {
      name: 'hasSport',
      rules: ['in:0,1'],
      tips: ['hasSport err']
    },
    {
      name: 'hasRead',
      rules: ['in:0,1'],
      tips: ['hasRead err']
    },
    {
      name: 'hasKindle',
      rules: ['in:0,1'],
      tips: ['hasKindle err']
    },
    {
      name: 'fallAsleep',
      rules: ['size:1-48'],
      tips: ['fallAsleep err']
    }
  ];

  const validator = new Validator(ruleset);

  for (let key in body) {
    const check = validator.check(body[key], key);
    if (check.isError) {
      throw new Error(check.tip);
    }
  }

  return true;
};

module.exports = {
  async addSleep(req, res, next) {
    let newSleep = null;
    try {
      formValid(req.body);
      newSleep = await Sleep.create(req.body);
      res.json({
        status: 0,
        data: newSleep
      });
    } catch (err) {
      // throw err;
      logger.err(err);
      next(err);
    }
  },

  async getSleep(req, res, next) {
    const { id } = req.query;
    const sl = await Sleep.findOne({ _id: id });
    res.json({
      status: 0,
      data: sl
    });
  },

  async updateSleep(req, res, next) {
    const { _id } = req.body;
    try {
      await Sleep.update({ _id: _id }, req.body);
      res.json({
        status: 0
      });
    } catch (err) {
      // throw err;
      logger.err(err);
      next(err);
    }
  },

  async listSleep(req, res, next) {
    const sleepList = await Sleep.find();
    res.json({
      status: 0,
      data: _.sortBy(sleepList, s => ~~s.date.slice(-2))
    });
  },

  async monthSleep(req, res, next) {
    // 格式化： '7' => '07'
    const currentMonth = ('0' + (new Date().getMonth() + 1)).slice(-2);
    const reg = new RegExp(`^\\d{4}-\\${currentMonth}-\\d{2}$`);
    const sleepList = await Sleep.find({ date: reg });
    res.json({
      status: 0,
      data: _.sortBy(sleepList, s => ~~s.date.slice(-2))
    });
  }
};
