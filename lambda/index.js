const Promise = require('bluebird');
const AWS = require('aws-sdk');
const S3 = new AWS.S3({ signatureVersion: 'v4' });
const jimp = require('jimp');

exports.handler = (event, context, callback) => {
    const promises = [];

    const records = event.Records;

    for (let record of records) {
        let bucket = record.s3.bucket.name;
        let key = record.s3.object.key;
        let basename = key.substr(key.lastIndexOf('/') + 1, key.length);
        let newKey = `thumbs/${basename}`;

        let p = S3.getObject({ Bucket: bucket, Key: key }).promise()
        .then((data) => jimp.read(data.Body))
        .then((image) => {
            image.resize(jimp.AUTO, 50);

            const getBuffer = Promise.promisify(image.getBuffer, { context: image });
            return getBuffer(jimp.AUTO);
        })
        .then((buffer) => S3.putObject({
            Body: buffer,
            Bucket: bucket,
            ContentType: 'image/png',
            Key: newKey
        }).promise());

        promises.push(p);
    }

    Promise.all(promises).then((values) => {
        callback(null, 'Success');
    }).catch((err) => {
        callback(err);
    });
};
