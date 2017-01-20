var _ = require('lodash');
var Config = require('config');
var Nodemailer = require('nodemailer');

var smtpConfig = Config.get('domainChecker.mailer.smtp');

if (!smtpConfig){
    throw new Error('SMTP is not configured');
}

var transporter = Nodemailer.createTransport(smtpConfig);

module.exports = transporter;
