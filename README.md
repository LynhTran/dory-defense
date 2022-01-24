# Dory Defense
Welcome to Dory Defender - a Chrome extension that helps protect your digital privacy!

Dory Defense has two major capabilities:
1. The software can detect when the user tries to access a known **malicious website**, warns them of the danger, and gives them the option to go back.
2. The extension also has the ability to detect when the user is writing potentially **sensitive information** in an email, such as a password, and alerts them as the algorithm picks it up.

There are also pop ups to **educate** users on digital privacy in the hopes that the information will influence them to act safer online.

(this was created for Minnehack 2022 - a 24 hour hackathon, [Devpost Project](https://devpost.com/software/update-later)]
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
