# Dory Defense
A Chrome extension that scans Gmail drafts for potentially sensitive information and checks visited domains against a blacklist of sites known for unwanted activities (scams, phishing, etc). The extension also detects if the user goes to any potentially malicious websites, and warns them against doing so.

## Installation (Extension)
Clone the project and load the folder as an [unpacked](https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked) extension.

## Installation (Server)
This server was tested with Python 2.7. To install dependencies, run `python -m pip install -r requirements.txt`. To start the webserver, run `python app.py`. The default host is 0.0.0.0 (all IPs bound) and the default port is 80.

## Sources
- [iziToast](https://izitoast.marcelodolza.com/)
- [jQuery](https://jquery.com/)
- [JavaScript MD5](https://github.com/blueimp/JavaScript-MD5)
