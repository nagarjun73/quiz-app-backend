const _ = require('lodash')
const Tag = require('../model/tag-model')

const tagCltr = {}

tagCltr.create = async (req, res) => {
  try {
    const body = _.pick(req.body, ["name"])
    const tag = new Tag()
    tag.name = body.name
    await tag.save()
    res.json(tag)
  } catch (e) {
    res.json(e)
  }
}

tagCltr.list = async (req, res) => {
  try {
    const listTags = await Tag.find()
    res.json(listTags)
  } catch (e) {
    res.json(e)
  }
}

module.exports = tagCltr