//Set initial checked state for both sliders
chrome.storage.sync.get(['emailOn'], function(result) {
    phishingToggler.checked = result.emailOn;
});

chrome.storage.sync.get(['blockerOn'], function(result) {
    blockerToggler.checked = result.blockerOn;
});

phishingToggler.addEventListener("change", function () {
    console.log(this.checked);
    chrome.storage.sync.set({'emailOn': this.checked});
});

blockerToggler.addEventListener("change", function () {
    console.log(this.checked);
    chrome.storage.sync.set({'blockerOn': this.checked});
});
