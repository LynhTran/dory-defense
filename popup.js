
//document.getElementById("fun-fact").addEventListener("click", showFunFact());
showFunFact();
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateFunFact(){
    var funFacts = ['Compromised passwords are responsible for 81 percent of hacking-related breaches.', 
                '27% of Americans have tried to guess someone else’s password, and 17% of them were able to guess correctly.', 
                '4 out of 10 Americans have had their personal data compromised online. Of those, 47% have lost money as a result.', 
                'Brute-force hacking tools are sold on criminal marketplaces for just $4 on average.', 
                'Approximately 15 billion spam emails are sent daily; 45% of all email is spam (and some researchers believe that number to be closer to 75%.', 
                'An analysis of more than 55 million emails reveals that one in every 99 emails is a phishing attack.', ];
    return funFacts[getRandomInt(funFacts.length)];
}

function showFunFact(){
    return iziToast.info({
        title: 'Did you know...',
        color: 'blue',
        message: generateFunFact(),
        position: 'bottomCenter',
        timeout: 15000,
        maxWidth: 500,
        iconUrl: 'https://cdn.muchskeptical.net/mh2022/icon.png',
    })             
}
 
$(document).ready(function(){
    chrome.storage.sync.get(['emailCount'], function(result) {
        chrome.storage.sync.get(['blockCount'], function(result2) {
            var totalHelpCount = result.emailCount + result2.blockCount;
            $('.counter-value')[0].innerText = totalHelpCount;
        });
    });
    /*$('.counter-value').each(function(){
        $(this).prop('Counter',0).animate({
            Counter: $(this).text()
        },{
            duration: 3500,
            easing: 'swing',
            step: function (now){
                $(this).text(Math.ceil(now));
            }
        });
    });*/
});
