
document.addEventListener('readystatechange', function() {
	if (document.readyState === 'interactive') {
		onload();
	}
});

// required form fields
var messageTextElement;
var consentElement;

// send button
var sendButtonElement;

// called when the page are loading
function onload() {
	window.sendButtonElement = document.getElementById('form-button-submit');
	window.sendButtonElement.onclick = validate;
	window.sendButtonElement.disabled = true;
	window.messageTextElement = document.getElementById('form-input-message');
	window.consentElement = document.getElementById('form-consent');
}

// called when submit button is pressed, and it 'activates' reCaptcha
function validate(event) {
	event.preventDefault();
	if (false) {
	
	} else {
		grecaptcha.execute();
	}
}

// called when the reCaptcha test has passed. Sending the message
function onSubmit(token) {

	let apiUrl = 'https://api.publiitest.t79.it/contact';
	let data = {
		'name': document.getElementById('form-input-name').value,
		'email': document.getElementById('form-input-email').value,
		'message': messageTextElement.value,
		'consent': consentElement.checked
	}

	// Sending the data to the server. and processes the response.
	fetch( apiUrl, {
		method: 'Post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(data => { 
		alert('Server says: ' + data);
	})
	.catch((error) => {
		console.error('Error', error);
	})
	
}

// activates the submit button when there are a message and consent
function checkRequirements() {
	if(window.messageTextElement.value.length > 0 && window.consentElement.checked) { 
		window.sendButtonElement.disabled = false; 
	} else { 
		window.sendButtonElement.disabled = true;
	}
}
