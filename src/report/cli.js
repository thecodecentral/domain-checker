var _ = require('lodash');
var Table = require('cli-table');

function generateFullReport(results) {
    // instantiate
    var table = new Table({
        head: ['Domain', 'Expiration Date'],
    });

    _.forEach(results, function ([domain, expirationDate]) {
        table.push([domain, expirationDate.format("YYYY-MM-DD")]);
    });

    return table.toString();
}

module.exports = {
    generateFullReport
};



