
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
	alert('thanks ' + document.getElementById('form-input-name').value);
}

// activates the submit button when there are a text in the text area
function stoppedTyping(formElm) {
	if(formElm.value.length > 0) { 
		document.getElementById('form-button-submit').disabled = false; 
	} else { 
		document.getElementById('form-button-submit').disabled = true;
	}
}

