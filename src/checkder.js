var Whois = require('node-whois');
var _ = require('lodash');
var Moment = require('moment');
var Promise = require('promise');

function fetchExpirationDate(domain) {
    return new Promise(function (resolve, reject) {
        Whois.lookup(domain, function (err, data) {
            arrayOfLines = data.match(/[^\r\n]+/g);

            _.map(arrayOfLines, function (line) {
                if (line.toLowerCase().indexOf('registrar registration expiration date') !== -1) {

                    var date = line.split(/^(.*)(\d{4}-\d{2}-\d{2})/)[2];
                    var expirationDate = Moment(date, 'YYYY-MM-DD');

                    resolve([domain, expirationDate]);
                }
            });
        });
    });
}

function multiFetchExpirationDate(domains) {
    var results = [];
    var promises = _.map(domains, function (domain) {
        return fetchExpirationDate(domain).then(function ([domain, expirationDate]) {
            results.push([domain, expirationDate]);
        });
    });

    return Promise.all(promises).then(function () {
        return results;
    });
}

module.exports = {
    fetchExpirationDate,
    multiFetchExpirationDate,
};


