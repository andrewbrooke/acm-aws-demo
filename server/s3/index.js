const debug = require('debug')(process.env.DEBUG + ':s3');

const Promise = require('bluebird');
const knox = require('knox');
const path = require('path');
const querystring = require('querystring');

let client;
exports.default = () => {
    debug('Configuring AWS SDK');

    client = knox.createClient({
        key: process.env.AWS_KEY,
        secret: process.env.AWS_SECRET,
        bucket: process.env.AWS_BUCKET_NAME
    });
};

/**
 * Uploads a message attachment to S3 bucket
 * @param {String}  file        file path
 * @return {String}             Object key
 */
exports.uploadFile = async function uploadFile(file) {
    const key = querystring.escape(path.basename(file));
    debug(`Uploading attachment to S3: ${key}`);

    const putFile = Promise.promisify(client.putFile, { context: client });
    await putFile(file, 'raw/' + key);

    return key;
};
