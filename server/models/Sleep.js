const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SleepSchema = new Schema({
  author_name: { type: String },
  date: { type: String },
  mark: { type: String },
  serious: { type: String },
  hunger: { type: String },
  san: { type: String },
  hp: { type: String },
  freeTime: { type: String },
  sleepTime: { type: String },
  hasImportantThing: { type: String },
  hasSport: { type: String },
  hasRead: { type: String },
  hasKindle: { type: String },
  fallAsleep: { type: String }
});

// SleepSchema.index({ topic_id: 1 });
// SleepSchema.index({ author_id: 1, create_at: -1 });

const Sleep = mongoose.model('Sleep', SleepSchema);
module.exports = Sleep;
