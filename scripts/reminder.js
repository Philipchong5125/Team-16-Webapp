$(document).ready(function() {

    console.log("hello");
    $('#activateSwitch').on('click', function () {
        console.log("clicked");
        var value = $('#activateSwitch').is(':checked');
        console.log(value);
        if(value) {
            $('#activateSwitchLabel').html("Deactivate");
        } else {
            $('#activateSwitchLabel').html("Activate");
        }
    });
});

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
    switch(day) {
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

function convertDaysToArray(days) {
    var result = [];
    days.sort();
    days.forEach(element => {
        result.push(convertDay(element));
    });
    return result;
}

function convertDay(day) {
    var short;
    switch(day) {
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

function remove(arr, element) {
    const index = arr.indexOf(element);
    if(index > -1) {
        arr.splice(index, 1);
    }
}


