//oauth2 auth
chrome.identity.getAuthToken(
	{'interactive': true},
	function(){
	  //load Google's javascript client libraries
		window.gapi_onload = authorize;
		loadScript('https://apis.google.com/js/client.js');
	}
);

function loadScript(url){
  var request = new XMLHttpRequest();

	request.onreadystatechange = function(){
		if(request.readyState !== 4) {
			return;
		}

		if(request.status !== 200){
			return;
		}

    eval(request.responseText);
	};

	request.open('GET', url);
	request.send();
}

function authorize(){
  gapi.auth.authorize(
		{
			client_id: '768162506749-n1v1g4kacsfcel9chrh7hjlkc1dlkb2i.apps.googleusercontent.com',
			immediate: true,
			scope: 'https://www.googleapis.com/auth/gmail.modify'
		},
		function(){
		  gapi.client.load('gmail', 'v1', gmailAPILoaded);
		}
	);
}
function getDrafts(userId){
        return gapi.client.gmail.users.threads.list({
              userId: 'me',
              q: query, //optional query
              labelIds: DRAFT //optional labels
          }); //returns a promise   
}
//GET https://gmail.googleapis.com/gmail/v1/users/{userId}/drafts/{id}
function getMostRecentDraft(userId){
    var url = ' https://gmail.googleapis.com/gmail/v1/users/' + userId + '/drafts/' + getDrafts().length;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson);
        });
}

function checkDraft(obj){
    // look at each word
    // send to back end check if it's a password or not
    // if it is, render pop up
    // else continue checking until end is reached
}
//	request.execute();