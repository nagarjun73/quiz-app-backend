const { Schema, model } = require('mongoose')

const quizSchema = new Schema({
  title: String,
  startDate: Date,
  endDate: Date,
  tags: String,
  questions: [{
    type: Schema.Types.ObjectId,
    ref: "Question"
  }],
  duration: String
}, { timestamps: true })

const Quiz = model('Quiz', quizSchema)

module.exports = Quiz