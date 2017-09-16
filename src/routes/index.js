import express from 'express'
import multer  from 'multer'
import email   from '../controllers/email'
import s3      from '../controllers/s3'
import db      from '../controllers/db'

var router = express.Router();

//upload a sound file to local upload folder
router.post('/sounds',
  multer({ dest: './uploads/'}).single('image'),
  s3.upload,
  db.saveSound,
  db.getUsers,
  email.toUsers,
);

router.post('/data',
  s3.createFile,
  s3.saveFile,
);

module.exports = router;
