function convertDaysToString(days) {
    var result = [];
    days.sort();
    days.forEach(element => {
        result.push(convertDayShort(element));
    });
    return result.join(".");
}

function convertDayShort(day) {
    var short;
    switch (day) {
        case 0:
            short = "M";
            break;
        case 1:
            short = "T";
            break;
        case 2:
            short = "W";
            break;
        case 3:
            short = "Th";
            break;
        case 4:
            short = "F";
            break;
        case 5:
            short = "Sat";
            break;
        case 6:
            short = "Sun";
            break;
        default:
            short = "";
    }
    return short;
}

function convertNumbersToDays(days) {
    var result = [];
    if (days) {
        days.sort();
        days.forEach(element => {
            result.push(convertNumber(element));
        });
    }
    return result;
}

function convertNumber(day) {
    var short;
    switch (day) {
        case 0:
            short = "mon";
            break;
        case 1:
            short = "tues";
            break;
        case 2:
            short = "wed";
            break;
        case 3:
            short = "thurs";
            break;
        case 4:
            short = "fri";
            break;
        case 5:
            short = "sat";
            break;
        case 6:
            short = "sun";
            break;
        default:
            short = "";
    }
    return short;
}

function convertDaysToNumbers(days) {
    var result = [];
    days.sort();
    days.forEach(element => {
        result.push(convertDay(element));
    });
    return result;
}

function convertDay(day) {
    var number;
    switch (day) {
        case "mon":
            number = 0;
            break;
        case "tues":
            number = 1;
            break;
        case "wed":
            number = 2;
            break;
        case "thurs":
            number = 3;
            break;
        case "fri":
            number = 4;
            break;
        case "sat":
            number = 5;
            break;
        case "sun":
            number = 6;
            break;
        default:
            number = -1;
    }
    return number;
}

function remove(arr, element) {
    const index = arr.indexOf(element);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

function convertHoursToArray(time) {
    var result = [];
    time.sort();
    time.forEach(element => {
        result.push(convertHours(element));
    });
    return result;
}