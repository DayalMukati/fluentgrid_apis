const errorHandler = (err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		res.statusCode = 401;
		err.message = `${err.name}: Token Invalid`;
	}
	if (err.message.startsWith('E11000')) {
		err.message = 'Already Exists';
	}

	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

	res.status(statusCode);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
};
const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	console.log(process.env.NODE_ENV, 'env');
	res.status(404);
	next(error);
};

module.exports = {
	errorHandler,
	notFound,
};
