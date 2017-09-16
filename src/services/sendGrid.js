const { SENDGRID_API_KEY } = require('../config');
const sendGrid = require('sendgrid')(SENDGRID_API_KEY);
const Hogan = require('hogan.js');
const fs = require('fs');
const fileExists = require('file-exists');

export default class SendGrid {
  constructor(templateFile, data) {
    this.templateFile = templateFile
    this.data         = data
  }

  createEmail() {
    let emailTemplate = this.getEmailTemplate(this.templateFile)
    let { to, from, subject, emailData } = this.data

    return new sendGrid.Email({
                to,
                from,
                subject,
                html:     emailTemplate.render({data: emailData})
              })
  }

  sendEmail(email, cb) {
    sendGrid.send(email, (err, json) => {
      if (err) { return console.error(err) }
      if (cb) { cb(json) }
    })
  }

  getEmailTemplate(fileName) {
    var filePath = __dirname + '/../../views/' + fileName

    return fileExists(filePath)
            ? Hogan.compile(fs.readFileSync(filePath, 'utf-8'))
            : false
  }
}
