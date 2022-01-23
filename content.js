//TODO: finish with backend
// const matches = null
// if (matches)

console.log('content.js loaded');

var checkedDomains = [];

function checkUrl() {
    var domain = window.location.hostname;
    if (checkedDomains.indexOf(domain) == -1) {
        console.log('Checking ' + domain);
        checkedDomains.push(domain);
        var hash = md5(domain + 'minnehack2022');
        sendPost(hash);
    } else {
        console.log('Already checked ' + domain);
    }
}

function sendPost(hash) {
    $.ajax({
        type: 'POST',
        url: 'https://mh2022.muchskeptical.net/api/check_url',
        data: JSON.stringify({'url_hash': hash}),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(data) {
            if (!data.safe) alert('This website is not safe!');
        },
        error: function(e) {
            console.log(e);
        }
    });
}

checkUrl();