const { Schema, model } = require('mongoose')

const responseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  quiz: {
    type: Schema.Types.ObjectId,
    ref: "Quiz"
  },
  questions: [{
    selection: String,
    correct: Boolean
  }]
})

const Response = model('Response', responseSchema)

module.exports = Response