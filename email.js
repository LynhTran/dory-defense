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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
var funFacts = ['Compromised passwords are responsible for 81 percent of hacking-related breaches.', 
                '27% of Americans have tried to guess someone else’s password, and 17% of them were able to guess correctly.', 
                '4 out of 10 Americans have had their personal data compromised online. Of those, 47% have lost money as a result.', 
                'Brute-force hacking tools are sold on criminal marketplaces for just $4 on average.', 
                'Approximately 15 billion spam emails are sent daily; 45% of all email is spam (and some researchers believe that number to be closer to 75%.', 
                'An analysis of more than 55 million emails reveals that one in every 99 emails is a phishing attack.', ];

function generateFunFact(){
    return funFacts[getRandomInt(funFacts.length)];
}

function showFunFact(){
    return iziToast.info({
        title: 'Did you know...',
        color: 'blue',
        message: generateFunFact(),
        position: 'topRight',
        timeout: 10000,
        maxWidth: 500,
        iconUrl: 'https://cdn.muchskeptical.net/mh2022/icon.png',
    })             
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
                    title: 'Hello Friend!',
                    color: 'blue',
                    maxWidth: 500,
                    position: 'topRight',
                    message: 'I noticed that you typed the word: ' + word + '. This could potentially be sensitive information that might not be safe to share over email!',
                    iconUrl: 'https://cdn.muchskeptical.net/mh2022/icon.png',
                    timeout: 10000,
                    buttons: [
                        ['<button class = "button-learn">Fun Fact</button>', function (instance, toast) {
                             showFunFact();
                        }],
                    ]
                });
            }
        },
        error: function(e) {
            console.log(e);
        }
    });
}

function checkToRun() {
    chrome.storage.sync.get(['emailOn'], function(result) {
        if (result.emailOn == null || result.emailOn) checkGmail();
    });
}

if (window.location.hostname == 'mail.google.com') {
    setInterval(checkToRun, 10000);
}

