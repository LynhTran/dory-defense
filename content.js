//TODO: finish with backend
// const matches = null
// if (matches)

// Remove this in production
chrome.storage.sync.clear();

console.log('content.js loaded');

function checkUrl() {
    var domain = window.location.hostname;
    chrome.storage.sync.get(['checkedDomains'], function(result) {
        var checkedDomains = result.checkedDomains;
        if (checkedDomains == null) checkedDomains = [];
        if (checkedDomains.indexOf(domain) == -1) {
            console.log('Checking ' + domain);
            var hash = md5(domain + 'minnehack2022');
            sendPostDomain(hash);
            checkedDomains.push(domain);
            chrome.storage.sync.set({'checkedDomains': checkedDomains});
        } else {
            console.log('Already checked ' + domain);
        }
    });
}

function sendPostDomain(hash) {
    $.ajax({
        type: 'POST',
        url: 'https://mh2022.muchskeptical.net/api/check_url',
        data: JSON.stringify({'url_hash': hash}),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(data) {
            if (!data.safe) {
                iziToast.error({
                    title: 'Warning',
                    message: 'This site may be unsafe, exercise caution when interacting with it',
                    timeout: 10000,
                    position: 'topLeft'
                });
            }
        },
        error: function(e) {
            console.log(e);
        }
    });
}

checkUrl();