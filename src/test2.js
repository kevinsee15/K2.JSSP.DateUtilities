var DateRange = /** @class */ (function () {
    function DateRange(dateA, dateB) {
        this.DateA = dateA;
        this.DateB = dateB;
    }
    return DateRange;
}());
function splitInputAndArrangeAsc(input) {
    var dateRangeList = [];
    var strDateRanges = input.split(",");
    for (var _i = 0, strDateRanges_1 = strDateRanges; _i < strDateRanges_1.length; _i++) {
        var strDateRange = strDateRanges_1[_i];
        var strDateA = strDateRange.split(';')[0];
        var strDateB = strDateRange.split(';')[1];
        dateRangeList.push(new DateRange(new Date(new Date(strDateA).toDateString()), new Date(new Date(strDateB).toDateString())));
    }
    return dateRangeList.sort(function (a, b) { return a.DateA < b.DateA ? -1 : a.DateA > b.DateA ? 1 : 0; });
    ;
}
function findGapsInDateRanges(input) {
    var gaps = [];
    for (var i = 1; i < input.length; i++) {
        var beginningOfHole = input[i - 1].DateB.getTime() / 1000;
        var endOfHole = input[i].DateA.getTime() / 1000;
        if (beginningOfHole < endOfHole) {
            gaps.push(new DateRange(new Date((beginningOfHole + 1) * 1000), new Date((endOfHole - 1) * 1000)));
        }
    }
    return gaps;
}
function dayDifference(input) {
    var totalDays = 0;
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var gap = input_1[_i];
        var diffTime = Math.abs(gap.DateB.getTime() - gap.DateA.getTime());
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        totalDays += diffDays - 1;
    }
    return totalDays;
}
function findGapsInDays(input) {
    var sanitizedList = splitInputAndArrangeAsc(input);
    var gapsInDateRanges = findGapsInDateRanges(sanitizedList);
    var gapsInDays = dayDifference(gapsInDateRanges);
    return gapsInDays;
}
var testInput = "2018/1/16;2018/2/15";
console.log(findGapsInDays(testInput));
