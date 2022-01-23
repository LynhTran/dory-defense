
alert("working");

document.addEventListener('DOMContentLoaded', function () {
    waitForElementToDisplay('div.editable[aria-label="Message Body"]',checker(),1000,9000);
});

function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
    var message = document.querySelector('div.editable[aria-label="Message Body"]').element.innerText;
    var startTimeInMs = Date.now();
    (function loopSearch() {
        if (document.querySelector(selector) != null) {
            callback();
            return;
        }
        else {
            setTimeout(function () {
                if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
                    return;
                loopSearch();
            }, checkFrequencyInMs);
        }
    })();
}

function checker(){
    var words = string.split(" ");
    for (var i = 0; i < words.length; i += 1) {
        // give words[i] to backend to see if it's a password
        var isPassword;
        if(isPassword){
            // display warning popup
            alert("warning");
        }
        alert("working");
    }
}