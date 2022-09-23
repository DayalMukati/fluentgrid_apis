const path = require('path');
const helmet = require('helmet');
const { logger } = require('./config/logger');
const { connectToFabric } = require('./utils/gateway');

const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const consumerRoutes = require('./routes/consumer')
connectToFabric();

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
const { errorHandler, notFound } = require('./middleware/error.js');

app.get('/', (req, res) => {
	res.send('🌐🌐');
});

app.use('/api/consumer', consumerRoutes);
//error middleware
app.use(notFound);
app.use(errorHandler);

//Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
	logger.info(`server started at ${port} on pid ${process.pid}`);
	// logger.info(`worker ${process.pid} started`)
});
// app.listen(port, "127.0.0.1", () => {
// 	console.log(`server started at ${port}`);
// });
// }