chrome.storage.sync.get(['emailOn'], function(result) {
    phishingToggler.checked = result.emailOn;
  });
chrome.storage.sync.get(['blockerOn'], function(result) {
    blockerToggler.checked = result.blockerOn;
  });



phishingToggler.addEventListener("change", function ()  {
    chrome.storage.sync.set({emailOn : this.checked});
    chrome.storage.sync.get(['emailOn'], function() {
    })});
    

blockerToggler.addEventListener("change", function ()  {
    chrome.storage.sync.set({blockerOn : this.checked});
    chrome.storage.sync.get(['blockerOn'], function() {
      })}); 