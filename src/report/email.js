var _ = require('lodash');
var Table = require('easy-table');

function generateFullReport(results) {
    var table = new Table();

    _.forEach(results, function ([domain, m]) {
        table.cell('Domain', domain);
        table.cell('Expiration Date', m.format("YYYY-MM-DD"));
        table.newRow();
    });

    var html = '<pre><font size="2"><tt><font face="Courier New, Courier, mono">';
    html += table.toString();
    html += '</font></tt></font></pre>';

    return html;
}

module.exports = {
    generateFullReport
};
