//TODO: finish with backend
// const matches = null
// if (matches)

// Remove this in production
//chrome.storage.sync.clear();

console.log('content.js loaded');

var checkedDomains = [];

function checkUrl() {
    var domain = window.location.hostname;
    chrome.storage.sync.get(['checkedDomains'], function(result) {
        checkedDomains = result.checkedDomains;
        if (checkedDomains == null) checkedDomains = [];
        if (checkedDomains.indexOf(domain) == -1) {
            console.log('Checking ' + domain);
            var hash = md5(domain + 'minnehack2022');
            sendPostDomain(hash);
            if (domain.indexOf('www.') != -1) {
                var hash = md5(domain.replace('www.', '') + 'minnehack2022');
                sendPostDomain(hash);
            }
            checkedDomains.push(domain);
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
                try {
                    iziToast.error({
                        title: 'Watch out friend!',
                        message: 'This site may be unsafe, exercise caution when interacting with it!',
                        maxWidth: 500,
                        iconUrl: 'https://cdn.muchskeptical.net/mh2022/icon.png',
                        timeout: 10000,
                        position: 'topCenter',
                        close: false,
                        drag: false,
                        buttons: [
                            ['<button>GO BACK</button>', function (instance, toast) {
                                window.history.back();                  
                            }],
                            ['<button>I trust this site</button>', function (instance, toast) {
                                instance.hide({transitionOut: 'fadeOutUp'}, toast, 'button');
                                chrome.storage.sync.set({'checkedDomains': checkedDomains});
                            }]
                        ]
                    });
                } catch (e) {
                    console.log(e);
                    alert('This site may be unsafe, exercise caution when interacting with it');
                }
            }
        },
        error: function(e) {
            console.log(e);
        }
    });
}

chrome.storage.sync.get(['blockerOn'], function(result) {
    console.log(result.blockerOn);
    if (result.blockerOn == null || result.blockerOn) checkUrl();
});