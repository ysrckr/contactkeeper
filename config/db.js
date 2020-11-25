const mongoose = require('mongoose')
require('dotenv').config()

const conn = async () => {
	try {
		await mongoose.connect(process.env.mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})
		console.log('mongo connected')
	} catch (err) {
		console.error(err.message)
		process.exit(1)
	}
}

module.exports = conn
