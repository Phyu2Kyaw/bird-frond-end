const fs       = require('fs');
const moment   = require('moment');
const _        = require('lodash');
import Knox from '../services/knox'

//next will pause or wait to finish uploading file in s3
const upload = (req, res, next) => {
  let knox = new Knox();
  let now  = moment();
  //let now = new Date().now();
  let { path, originalname } = req.file;
  let fileName = `${now}-${originalname}`;
//'sounds' + filename;
  knox.getClient().putFile(path, `sounds/${fileName}`, function(err, response){
    if (err) {
      console.log(err)
    } else {
      req.body.payload = {
        path: response.req.url,
        name: fileName
      }
      next();
    }
  });
}

const createFile = (req, res, next) => {
  if (!_.isEmpty(req.body)) {
    let now  = moment();
    let file = `${now}.json`
    let json  = JSON.stringify(req.body)

    fs.writeFile(file, json, 'utf8', function(err) {
      if (err) {
        console.log(err);
      } else {
        req.body.file = file
        next()
      }
    });
  } else{
    res.send({success: false})
  }
}

const saveFile = (req, res) => {
  let file = req.body.file;
  let knox = new Knox();

  knox.getClient().putFile(file, `data/${file}`, function(err, response){
    if (err) {
      res.send({error: error})
    } else {
      fs.unlinkSync(file);
      res.send({success: true})
    }
  });
}

export default {
  upload,
  createFile,
  saveFile
};
