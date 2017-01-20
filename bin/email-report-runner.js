var _ = require('lodash');
var Checker = require('../src/checkder');
var Mailer = require('../src/mailer/smtp');
var EmailReport = require('../src/report/email');
var ResultFilter = require('../src/report/result-filters');
var Config = require('config');

var config = Config.get('domainChecker');

function sendMail(subject, htmlBody) {
    var mailOptions = {
        from: config.fromEmail,
        to: config.toEmail,
        subject: subject,
        //text: textBody,
        html: htmlBody
    };

    Mailer.sendMail(mailOptions);
}

console.info('Running Domain Checker cli...');

Checker.multiFetchExpirationDate(config.domains).done(function (results) {
    sendMail('Domain Checker Report', EmailReport.generateFullReport(results));

    var criticalResults = ResultFilter.expireInDays(results);
    if (criticalResults.length > 0) {
        sendMail('Domain Checker Report', EmailReport.generateFullReport(criticalResults));
    }

    console.info('Done');
});

