var _ = require('lodash');
var Moment = require('moment');

function expireInDays(results) {
    return _.filter(results, function ([domain, expirationDate]) {
        var aboutToExpire = expirationDate.isBefore(Moment().add(180, 'days'));

        if (aboutToExpire) {
            console.log(domain, 'about to expire', expirationDate);
        }

        return aboutToExpire;
    });
}

module.exports = {
    expireInDays
};