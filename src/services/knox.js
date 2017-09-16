const knox   = require('knox');
const {
  S3_KEY,
  S3_SECRET,
  S3_BUCKET } = require('../config');

export default class Knox {
  constructor() {
    this.client = knox.createClient({
        key   : S3_KEY,
        secret: S3_SECRET,
        bucket: S3_BUCKET
    })
  }

  getClient() {
    return this.client;
  }

  saveBuffer(buffer, name, option, cb) {
    console.log('1')
    this.client.putBuffer(buffer, name, option, (err, response) => {
      cb(err, response)
    })
  }
}

