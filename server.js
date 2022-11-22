const path = require('path');
const cron = require('node-cron');
const helmet = require('helmet');
const {
	logger
} = require('./config/logger');
const {
	connectToFabric
} = require('./utils/gateway');

const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

//import routes
const consumerRoutes = require('./routes/consumer');
const ctuRoutes = require('./routes/ctu');
const gencoRoutes = require('./routes/genco');
const nmaRoutes = require('./routes/nma');
const rldcRoutes = require('./routes/rldc');
const sldcRoutes = require('./routes/sldc');
const stuRoutes = require('./routes/stu');
const adminRoutes = require('./routes/admin');
const commonRoutes = require('./routes/common')

const {
	channelOnecron: channelone
} = require('./controller/cronjobs');

//Cron Schedule
cron.schedule('5 8 * * 0', channelone);

const express = require('express');
const app = express();

//parse json
app.use(
	express.json({
		limit: '50mb',
	})
);
app.use(
	express.urlencoded({
		limit: '50mb',
		extended: true,
	})
);

//security middleware
app.use(helmet());
app.use(cors());
const {
	errorHandler,
	notFound
} = require('./middleware/error.js');

app.get('/', (req, res) => {
	res.send('🌐🌐');
});

//Routes
app.use('/api/consumer', consumerRoutes);
app.use('/api/ctu', ctuRoutes);
app.use('/api/genco', gencoRoutes);
app.use('/api/nma', nmaRoutes);
app.use('/api/rldc', rldcRoutes);
app.use('/api/sldc', sldcRoutes);
app.use('/api/stu', stuRoutes);
app.use('/api/auth', adminRoutes);
app.use('/api/common', commonRoutes);


//error middleware
app.use(notFound);
app.use(errorHandler);

//Port
const port = process.env.PORT || 3000;
app.listen(port, () => {
	logger.info(`server started at ${port} on pid ${process.pid}`);
	// logger.info(`worker ${process.pid} started`)
});
// app.listen(port, "127.0.0.1", () => {
// 	console.log(`server started at ${port}`);
// });
// }