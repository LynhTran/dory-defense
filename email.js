console.log('hi');

var checkedWords = [];

function checkGmail() {
    var element = document.querySelector('div.editable[aria-label="Message Body"]');
    if (element != null) {
        console.log('Found element');
        console.log(element.innerText);
        console.log(checkedWords);
        var words = element.innerText.split(' ');
        words.forEach(function (item, index) {
            var word = item.trim();
            if (checkedWords.indexOf(word) == -1) {
                checkedWords.push(word);
                checkWord(word);
            }
        });
    } else {
        console.log('No element found');
    }
}

function checkWord(word) {
    console.log('Checking ' + word);
    //Do an AJAX POST req to server here
}

setInterval(checkGmail, 1500);