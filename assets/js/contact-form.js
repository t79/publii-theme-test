
document.addEventListener('readystatechange', function() {
	if (document.readyState === 'interactive') {
		onload();
		document.getElementById('form-button-submit').disabled = true;
	}
});

// called when the page are loading
function onload() {
	var element = document.getElementById('form-button-submit');
	element.onclick = validate;
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

// activates the submit button when there are a text in the text area
function stoppedTyping(formElm) {
	if(formElm.value.length > 0) { 
		document.getElementById('form-button-submit').disabled = false; 
	} else { 
		document.getElementById('form-button-submit').disabled = true;
	}
}

