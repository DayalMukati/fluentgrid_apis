const { logger } = require('./logger')
const mongoose = require('mongoose')
const urlOfficial =
	'mongodb+srv://goldadmin:oCJLOlkFejWllQfj@cluster0.3gjfu.mongodb.net/gold?retryWrites=true&w=majority'
const urlLocal = 'mongodb://localhost:27017/your-cluster-name'

exports.connectToDB = () => {
	try {
		mongoose.connect(urlOfficial, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		})
		logger.info('Connected to DB')
	} catch (err) {
		logger.error('Database Error =>', err)
	}
}
