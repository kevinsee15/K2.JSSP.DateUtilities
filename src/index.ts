import '@k2oss/k2-broker-core';

metadata = {
    systemName: "com.k2.example",
    displayName: "Example Broker",
    description: "An example broker that accesses JSONPlaceholder."
};

ondescribe = async function ({ configuration }): Promise<void> {
    postSchema({
        objects: {
            "gapsInDateRanges": {
                displayName: "Gaps in Date Ranges",
                description: "Finds gaps in a list of date ranges.",
                properties: {
                    "input": {
                        displayName: "input",
                        type: "string"
                    },
                    "outputInDays": {
                        displayName: "Output in Days",
                        type: "number"
                    },
                    "outputFormatted": {
                        displayName: "Output Formatted",
                        type: "string"
                    }
                },
                methods: {
                    "inDays": {
                        displayName: "In Days",
                        type: "read",
                        inputs: ["input"],
                        requiredParameters: ["input"],
                        outputs: ["outputInDays", "outputFormatted"]
                    }
                }
            }
        }
    });
}

onexecute = async function ({ objectName, methodName, parameters, properties, configuration, schema }): Promise<void> {
    switch (objectName) {
        case "gapsInDateRanges": await onexecuteTodo(methodName, properties, parameters); break;
        default: throw new Error("The object " + objectName + " is not supported.");
    }
}

async function onexecuteTodo(methodName: string, properties: SingleRecord, parameters: SingleRecord): Promise<void> {
    switch (methodName) {
        case "inDays": await findGapsInDays(properties); break;
        default: throw new Error("The method " + methodName + " is not supported.");
    }
}

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

function findGapsInDays(properties: SingleRecord) {
    let input: string = properties["input"].toString();

    let sanitizedList = splitInputAndArrangeAsc(input);
    let gapsInDateRanges = findGapsInDateRanges(sanitizedList);
    let gapsInDays = dayDifference(gapsInDateRanges);

    let outputFormatted = "No gaps were found.";
    
    if (gapsInDays == 1) {
        outputFormatted = gapsInDays + " Day";
    } else if (gapsInDays > 1) {
        outputFormatted = gapsInDays + " Days";
    }

    postResult({
        "outputInDays": gapsInDays,
        "outputFormatted": outputFormatted
    });
}