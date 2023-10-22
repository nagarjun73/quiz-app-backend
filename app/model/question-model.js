const { Schema, model } = require('mongoose')

const questionSchema = new Schema({
  title: String,
  type: String,
  options: [
    {
      optionText: String,
      isCorrect: Boolean
    }
  ],
  tags: {
    type: Schema.Types.ObjectId,
    ref: "Tag"
  },
  score: String
}, { timestamps: true })

const Question = model('Question', questionSchema)

module.exports = Question