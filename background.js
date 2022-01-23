chrome.runtime.onInstalled.addListener(function(details){
    if (details.reason == "install"){
        chrome.storage.sync.set({'emailOn': true});
        chrome.storage.sync.set({'blockerOn': true});
        chrome.storage.sync.set({'blockCount': 0});
        chrome.storage.sync.set({'emailCount': 0});
    } else if (details.reason == "update"){
        console.log('Updated')
    }
});
