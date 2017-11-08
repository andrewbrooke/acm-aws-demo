const debug = require('debug')(process.env.DEBUG + ':pg');

const { Client } = require('pg');

const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

exports.default = async () => {
    debug('Testing pg connection');

    await client.connect();
    client.query('SELECT NOW()', (err, res) => {
        if (!err) debug('pg connection successful');
        else debug(`Error connecting to pg: ${err}`);
    });
};

exports.insertImageKey = async (key) => {
    debug(`Inserting image key ${key}`);

    return client.query(`INSERT INTO public.image_keys(key) VALUES ('${key}')`).then((result) => {
        return result;
    }).catch((err) => {
        debug(`An error occurred while inserting a new image key: ${err}`);

        return undefined;
    });
};
