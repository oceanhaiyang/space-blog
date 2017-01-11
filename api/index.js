function toStr(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}

function dateFormat(date) {
    date = new Date(date);

    var year = date.getYear() + 1900,
        month = date.getMonth() + 1,
        day = date.getDate();

    return [year, month, day].map(toStr).join('-');
}

module.exports = {dateFormat: dateFormat};