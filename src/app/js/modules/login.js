async function login (email, pass) {
    return app.login(email, pass);
}

async function getUser (email) {
    return app.getOneUser(email);
}

const isRequired = value => value === '' ? false : true;
const buttonSubmit = document.querySelector('#submit-button')

window.addEventListener('load', async () => {

    buttonSubmit.addEventListener('click', async (e) => {
        e.preventDefault()
        let isValid = checkEmailInDb() && await validatePassword()
        let isFormValid = isValid
        if (isFormValid) {
            window.location.href='../html/project.html'
        }
    })
})

const showError = (input, message) => {
    const formField = input.parentElement;
    input.classList.remove('success');
    input.classList.add('error');
    const error = formField.querySelector('small');
    error.textContent = message;
};
const showSuccess = (input) => {
    const formField = input.parentElement;
    input.classList.remove('error');
    input.classList.add('success');
    const error = formField.querySelector('small');
    error.textContent = '';
}

const checkEmailInDb = async () => {

    let valid = false;
	const emailEl = document.querySelector('#email');
    const email = emailEl.value.trim();
    const user = await getUser(email)

    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!user.length) {
        showError(emailEl, 'Wrong email.');
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
}

const validatePassword = async () => {

    let valid = false;
	const passwordEl = document.querySelector('#password');
    const password = passwordEl.value.trim();
    const emailEl = document.querySelector('#email');
    const email = emailEl.value.trim();
    const success = await login(email, password)

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!success) {
        showError(passwordEl, 'Wrong password.');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }
    return valid;
}