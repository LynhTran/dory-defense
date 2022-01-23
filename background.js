chrome.runtime.onInstalled.addListener(function(details){
    if (details.reason == "install"){
        chrome.storage.sync.set({'emailOn': true});
        chrome.storage.sync.set({'blockerOn': true});
    } else if (details.reason == "update"){
        console.log('Updated')
    }
});