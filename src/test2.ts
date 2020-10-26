class DateRange {
    DateA: Date;
    DateB: Date;

    constructor(dateA: Date, dateB: Date) {
        this.DateA = dateA;
        this.DateB = dateB;
    }
}

function splitInputAndArrangeAsc(input: string): DateRange[] {
    let dateRangeList: DateRange[] = [];

    let strDateRanges: string[] = input.split(",");

    for (let strDateRange of strDateRanges) {
        let strDateA: string = strDateRange.split(';')[0];
        let strDateB: string = strDateRange.split(';')[1];

        dateRangeList.push(new DateRange(new Date(new Date(strDateA).toDateString()), new Date(new Date(strDateB).toDateString())));
    }

    return dateRangeList.sort((a, b) => a.DateA < b.DateA ? -1 : a.DateA > b.DateA ? 1 : 0);;
}

function findGapsInDateRanges(input: DateRange[]): DateRange[] {
    var gaps: DateRange[] = [];

    for (var i = 1; i < input.length; i++) {
        var beginningOfHole = input[i - 1].DateB.getTime() / 1000;
        var endOfHole = input[i].DateA.getTime() / 1000;
        if (beginningOfHole < endOfHole) {
            gaps.push(new DateRange(new Date((beginningOfHole + 1) * 1000), new Date((endOfHole - 1) * 1000)));
        }
    }

    return gaps;
}

function dayDifference(input: DateRange[]): number {
    let totalDays = 0;

    for (let gap of input) {
        let diffTime = Math.abs(gap.DateB.getTime() - gap.DateA.getTime());
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        totalDays += diffDays - 1;
    }

    return totalDays;
}

function findGapsInDays(input: string): number {
    let sanitizedList = splitInputAndArrangeAsc(input);
    let gapsInDateRanges = findGapsInDateRanges(sanitizedList);
    let gapsInDays = dayDifference(gapsInDateRanges);

    return gapsInDays;
}

let testInput = "2018/1/16;2018/2/15,2018/2/8;2018/3/10,2018/3/16;2018/4/1";
console.log(findGapsInDays(testInput));