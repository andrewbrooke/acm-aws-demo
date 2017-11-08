# acm-aws-demo server

A NodeJS & Express web server to serve an API for uploading files to Amazon S3.

## Installation

Prerequisites:

- [NodeJS >= v8 preferred](https://nodejs.org/en/blog/release/v8.0.0/)
- A text editor

Run `npm install` to install dependencies

Create `.env` with the following contents:

```
DEBUG=acm-node-demo*
NODE_ENV=development
PORT=8080
AWS_KEY=*****
AWS_SECRET=*****
AWS_BUCKET_NAME=*****
PGHOST=*****
PGDATABASE=*****
PGUSER=*****
PGPASSWORD=*****
PGPORT=*****
```

## Running the Server

Run and watch for file changes: `npm run dev`

Run Mocha tests: `npm test`

## Accessing the API

`curl -X GET http://localhost:8080/api/v1`

```
{
    "message": "API version: 1"
}
```

`curl -X POST http://localhost:8080/api/v1/upload -H "content-type: multipart/form-data" -F file=@YourFile.png`

```
{
    "key": "xxxxxxxxxxxxxxxxxxxxxxxxxxx.png",
    "inserted": true
}
```
