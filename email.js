console.log('Hi! You are in email.js');

var checkedWords = [];

function checkGmail() {
    var elements = document.querySelectorAll('div.editable[aria-label="Message Body"]'); // In case user opens multiple compose tabs
    if (elements.length > 0) {
        elements.forEach(function (element, elementIndex) {
            console.log('Found element');
            console.log(element.innerText);
            console.log(checkedWords);
            var words = element.innerText.split(' ');
            words.forEach(function (item, index) {
                var word = item.trim();
                if (word.length > 0 && checkedWords.indexOf(word) == -1) {
                    sendPostWord(word);
                    checkedWords.push(word);
                }
            });
        });
    } else {
        console.log('No element found');
    }
}

function sendPostWord(word) {
    $.ajax({
        type: 'POST',
        url: 'https://mh2022.muchskeptical.net/api/check_words',
        data: JSON.stringify({'words': word}),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(data) {
            if (!data.safe) {
                iziToast.warning({
                    title: 'Warning',
                    message: word + ' was flagged as potentially sensitive information',
                    iconUrl: 'https://cdn.muchskeptical.net/mh2022/icon.png',
                    timeout: 3000,
                    position: 'bottomLeft'
                });
            }
        },
        error: function(e) {
            console.log(e);
        }
    });
}

if (window.location.hostname == 'mail.google.com') {
    setInterval(checkGmail, 10000);
}