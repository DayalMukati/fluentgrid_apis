require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
	region,
	accessKeyId,
	secretAccessKey,
});

/**
 *	Upload to videos to folders based on the params
 * @param {Buffer} fileBuffer file in buffer stream
 * @param {{filename:string,userid:string,mime:string,category:String}} meta all the meta data
 * @returns Promice
 */
function uploads3UserVideosToBucket(fileBuffer, meta) {
	const { userid, lang, category, filename, mime } = meta;
	const uploadParams = {
		Bucket: `${bucketName}/${lang}/${category}`,
		Body: fileBuffer,
		Key: filename,
		ContentType: mime,
		ACL: 'public-read',
	};
	return s3.upload(uploadParams).promise();
}
/**
 *	Upload app videos to bucket [ type can be , items ,category ,diamond etc ]
 * @param {Buffer} fileBuffer file in buffer stream
 * @param {{filename:string,mime:string,type:String}} meta all the meta data
 * @returns Promice
 */
function uploadDataToBucket(fileBuffer, meta) {
	const { type, filename, mime } = meta;
	const uploadParams = {
		Bucket: `${bucketName}/${type}`,
		Body: fileBuffer,
		Key: filename,
		ContentType: mime,
		ACL: 'public-read',
	};
	return s3.upload(uploadParams).promise();
}
/**
 *	Upload user Items to the bucket
 * @param {Buffer} fileBuffer file in buffer stream
 * @param {{filename:string,mime:string,userId:String}} meta all the meta data
 * @returns Promice
 */
function uploadUserDataToBucket(fileBuffer, meta) {
	const { userId, filename, mime } = meta;
	const uploadParams = {
		Bucket: `${bucketName}/user/${userId}`,
		Body: fileBuffer,
		Key: filename,
		ContentType: mime,
		ACL: 'public-read',
	};
	return s3.upload(uploadParams).promise();
}

/**
 * gives url using the s3 key of the file
 * @param {string} key  key of the file
 * @returns string
 */
function getDataUrlFromBucket(key) {
	return `https://${bucketName}.s3.${region}.amazonaws.com/${encodeURIComponent(
		key
	)}`;
}

/**
 * Delete files from a bucket
 * @param {string} key name of the file
 * @param {string} bucketName name of the bucket defaults to loco user
 * @returns
 */
function deleteBucketItem(key, Bucket = bucketName) {
	console.log({ Bucket, key });
	return s3.deleteObject({ Key: key, Bucket }).promise();
}

module.exports = {
	uploads3UserVideosToBucket,
	uploadDataToBucket,
	uploadUserDataToBucket,
	getDataUrlFromBucket,
	deleteBucketItem,
};
