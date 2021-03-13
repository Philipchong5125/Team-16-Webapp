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