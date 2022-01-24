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

## Screenshots
![Counter](/images/counter.jpg)  
Our extension keeps a count of how many malicious websites and sensitive pieces of information we catch.  
![Website](/images/website.jpg)  
![Password](/images/password.jpg)  
![Query](/images/query.png)  
Queries to the ML model can be submitted via REST API.  
![Predict](/images/predict.png)  
Queries are classified as "password" or "not password" in the prediction.  
![Data](/images/data.png)  
Over 43,000 instances of passwords were labelled for the machine learning model and 10,000 instances were labelled as not passwords. 