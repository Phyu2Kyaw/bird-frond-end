import SendGrid from '../services/sendGrid'
const { SUPPORT_EMAIL, FRONT_END_URL } = require('../config');

const toUsers = (req, res) => {
  let { key, users } = req.body.payload
  let link = FRONT_END_URL + key;

  let sendGrid = new SendGrid('template.hjs', {
    to        : toArray(users),
    from      : SUPPORT_EMAIL,
    subject   : 'We need your opinions for this sound!',
    emailData : { link }
  })

  sendGrid.sendEmail(sendGrid.createEmail(), (json) => {
    res.send({success: true})
  })
}

const toArray = (obj) => {
  return Object.keys(obj).map((k, i) => {
    return obj[k].email
  })
}

export default {
  toUsers
};
