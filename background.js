let emailOn = true;
let blockerOn = true;

chrome.runtime.onInstalled.addListener(() => {
  console.log("initialized");
  chrome.storage.sync.set({emailOn},
  function() {
  });
  chrome.storage.sync.set({blockerOn},
  function() {
  })
});