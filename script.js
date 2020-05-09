const form = document.querySelector('.form');

const errorBlock = document.querySelector('.error-block');
const errorText = document.querySelector('.error');

const username = document.querySelector('.username-input');
const email = document.querySelector('.email-input');
const password = document.querySelector('.pw-input');
const repeatPassword = document.querySelector('.rpw-input');

const fields = [username, email, password, repeatPassword];
const usersFromDB = ['test', 'test123', 'halelujah'];


const throwError = message => {
	errorBlock.style.display = 'block';
	errorText.innerHTML = message;
};
const emptyFields = fields => {
	let isEmpty;
	fields.forEach(field =>
		field.value.length === 0 ? (isEmpty = true) : (isEmpty = false)
	);
	return isEmpty;
};
const uniqueUser = (usersFromDB, username) => {
	if (!usersFromDB.indexOf(username.value)) return false;
	else return true;
};
const validEmail = email => {
	const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegex.test(email.value) ? true : false;
};
const validPassowrd = password => {
	if (password.value.length < 6) return false;
	else return true;
};
const validRepeat = (password, repeatPassword) => {
	if (password.value === repeatPassword.value) return true;
	else return false;
};

form.addEventListener('submit', e => {
	e.preventDefault();

	if (emptyFields(fields)) throwError('All fields must be completed.');
	
	else if (!uniqueUser(usersFromDB, username)) throwError('Username taken.');
	
	else if (!validEmail(email)) throwError('You must enter a valid email.');

	else if (!validPassowrd(password))
		throwError('Your password must have at least 6 characters.');

	else if (!validRepeat(password, repeatPassword))
		throwError('Your passwords do not match.');
	
	else {
		errorBlock.classList.add('success');
		throwError('Submitted.');
	}
});