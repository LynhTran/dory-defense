![Dory](icon.png)

# Dory Defense

Welcome to Dory Defense - a Chrome extension that helps protect your digital privacy!

Dory Defense has two major capabilities:

1. The software can detect when the user tries to access a known **malicious website**, warns them of the danger, and gives them the option to go back.

2. The extension also has the ability to detect when the user is writing potentially **sensitive information** in an email, such as a password, and alerts them as the algorithm picks it up.

There are also pop ups to **educate** users on digital privacy in the hopes that the information will influence them to act safer online.

(this was created in 24 hours for Minnehack 2022 and placed 1st overall [Devpost Page](https://devpost.com/software/update-later) | [Demo Video](https://youtu.be/fSmBA6t5TO8))

## Inspiration

While volunteering at an Alzheimer's assisted living home in high school, Lynh remembered how one resident lost $3000 just by sending her bank account info in an email to a phisher. If only someone... or someTHING would've told that resident how unsafe sending sensitive information like that is over the internet. As technology has advanced at an alarming rate, technological illiteracy has become a serious problem among the elderly, leading to them being disproportionally targeted. This was our inspiration for Dory Defense! That poor blue fish with a bit of a memory issue we all know and love is the perfect reminder of the people we are trying to help, and of course, is a veteran in the war against phishing! _(pun intended)_

## How we built it

Both parts of the back-end required enormous amounts of data, and we decided to attack the two issues in different ways.

**Malicious Site Warning**:

To determine whether a website was malicious or not, we scraped a couple of sources with data on domains that participated in phishing, scamming, and other undesirable behavior, and continuously fed that stream of data into a database. We then had the browser send a salted hash of the domain the user was on to cross-reference against that database. If the hashes collided, then we knew the user was on a malicious site without having to use the domain directly.

**Email Scanner**:
For the email scanner, we collected **10 million leaked passwords** on SecList dataset, “RockYou2021” dataset, and auto generated Google passwords to train a linear learner GCP AI Platform model with the labelled password data. Unfortunately, this required us to send the word string to an off-device server for validation, risking potential breaches to privacy. We did also implement an alternative simple algorithm for checking passwords on-device though, so that could be a safer option as it wouldn't be able to be abused as a potential keylogger.

An update to this project uses a flattened local random forest decision tree model with pre-processing that allows password checking to stay on device. Code for creating this model can be found [here](https://github.com/lukechn99/password-model).

**Pop Ups/UI**:
Utilized the iziToast library and Bootstrap, with additional personalization with JavaScript, HTML, and CSS to create a pop up warning for malicious sites, a pop up warning for sensitive information in emails, a fun fact pop up, the extension homepage, and the options page.

## What we learned

This was the first time any of us had worked with extensions, so the **Chrome Extensions API** was something that we were forced to learn on the spot. All of our members came from different development backgrounds as well, so we all learned various things during the hackathon, including but not limited to **web design (HTML/CSS/JS)**, **backend development (Flask/MongoDB)**, the **Google Cloud Platform (buckets, AI Platform, AutoML, IAM)**, and **machine learning (AI Platform/Tensorflow)**.

## Screenshots

![EmailPreview](/images/emailPreview.png)
![Counter](/images/counter.jpg)  
Our extension keeps a count of how many malicious websites and sensitive pieces of information we catch.  
![Website](/images/website.jpg)  
![Password](/images/password.jpg)  
![Query](/images/query.png)  
Queries to the ML model can be submitted via REST API.  
![Predict](/images/predict.png)  
Queries are classified as "password" or "not password" in the prediction.  
![Decision Tree](/images/decision_tree.png)
The ensemble password model uses a decision tree with pre-processing to decide if a string is a password
![Data](/images/data.png)  
Over 43,000 instances of passwords were labelled for the machine learning model and 10,000 instances were labelled as not passwords.

## Installation (Extension)

Clone the project and load the folder as an [unpacked](https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked) extension.
![installationInstructions](/images/installation.png)

## Installation (Server)

This server was tested with Python 2.7. To install dependencies, run `python -m pip install -r requirements.txt`. To start the webserver, run `python app.py`. The default host is 0.0.0.0 (all IPs bound) and the default port is 80.

## Sources

- [iziToast](https://izitoast.marcelodolza.com/)
- [jQuery](https://jquery.com/)
- [JavaScript MD5](https://github.com/blueimp/JavaScript-MD5)
