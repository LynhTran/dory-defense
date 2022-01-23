let emailOn = true;
let blockerOn = true;

let emailCount = 0;
let blockCount = 0;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({emailOn},
    function() {
    });
    chrome.storage.sync.set({blockerOn},
    function() {
    });
    chrome.storage.sync.set({emailCount},
    function() {
    });
    chrome.storage.sync.set({blockCount},
    function() {
    })
});
