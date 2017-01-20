var _ = require('lodash');
var Checker = require('../src/checkder');
var CliReport = require('../src/report/cli');
var Config = require('config');

var config = Config.get('domainChecker');

console.info('Running Domain Checker cli...');
Checker.multiFetchExpirationDate(config.domains).done(function (results) {
    console.info(CliReport.generateFullReport(results));
    console.info('Done');
});
