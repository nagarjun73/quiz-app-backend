const Tag = require('../model/tag-model')

const tagCltr = {}

tagCltr.create = async (req, res) => {
  try {
    const body = _.pick(req.body, ["name"])
    const tag = await new Tag()
    tag.name = body.name
    const saveTag = await tag.save()
    res.json(saveTag)
  } catch (e) {
    res.json(e)
  }
}

module.exports = tagCltr