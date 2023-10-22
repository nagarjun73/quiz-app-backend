const mongoose = require('mongoose')
const url = process.env.DB_URL
const name = process.env.DB_NAME

const configDB = async () => {
  try {
    const connected = await mongoose.connect(`${url}/${name}`)
    console.log('Connected to DB')
  } catch (e) {
    console.log('Error connecting to DB')
  }
}

module.exports = configDB
