const debug = require('debug')(process.env.DEBUG + ':routes');

const crypto = require('crypto');
const multer = require('multer');
const path = require('path');

const s3 = require('../s3');
const pg = require('../pg');

const TMP_DIR = './tmp';

const storage = multer.diskStorage({
    destination: TMP_DIR,
    filename: (req, file, cb) => {
        crypto.pseudoRandomBytes(16, (err, raw) => {
            if (err) return cb(err);
            return cb(null, `${raw.toString('hex')}${path.extname(file.originalname)}`);
        });
    }
});

const upload = multer({ storage });
const uploadSingle = upload.single('file');

const IMAGE_EXTS = ['.jpeg', '.jpg', '.png'];

/**
 * Accepts a POST request and uploads the image to S3s
 * @param  {Object} req     Express request
 * @param  {Object} res     Express response
 */
async function uploadS3(req, res) {
    const { file } = req;
    debug('Uploading image to S3', file);

    if (!file) {
        res.status(400).json({
            error: `A file with the extension ${IMAGE_EXTS} must be sent in multipart/form-data key 'file'`
        });
        return;
    }

    if (!IMAGE_EXTS.includes(path.extname(file.path))) {
        res.status(400).json({
            error: `File must have extension ${IMAGE_EXTS}`
        });
        return;
    }

    const key = await s3.uploadFile(file.path);
    const result = await pg.insertImageKey(key);

    res.status(200).json({
        key,
        inserted: typeof result !== 'undefined'
    });
}

exports.uploadS3 = [uploadSingle, uploadS3];
