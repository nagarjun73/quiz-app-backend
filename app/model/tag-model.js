const { Schema, model } = require('mongoose')

const tagSchema = new Schema({
  name: String
})

const Tag = model('Tag', tagSchema)

module.exports = Tag