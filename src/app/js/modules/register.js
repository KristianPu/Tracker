async function createUser (fName, lName, email, pass) {
    await app.register(fName, lName, email, pass);
}

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const isPassLength = value => /.{8,}/.test(value);
const isPassSpecial = value => /(?=.*?[#?!@$%^&*-])/.test(value);
const isPassNumber = value => /(?=.*?[0-9])/.test(value);
const isPassUpper = value => /(?=.*?[A-Z])/.test(value);
const isPassLower = value => /(?=.*?[a-z])/.test(value);
const isEmail = value => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
const buttonSubmit = document.querySelector('#submit-button')

window.addEventListener('load', async () => {

    buttonSubmit.addEventListener('click', async (e) => {
        e.preventDefault()
        const formInputs = document.querySelectorAll('#register-form input')
        const filteredData = Array.from(formInputs).reduce((acc, input) => ({
            ...acc, [input.id]: input.value
        }), {})
        let isValid = checkFirstName() && checkLastName() && checkEmail() && checkPassword() && checkConfirmPassword()
        let isFormValid = isValid
        if (isFormValid) {
            await createUser(filteredData["fname"], filteredData["lname"], filteredData["email"], filteredData["password"])
            document.getElementById('register-form').reset()
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

const checkFirstName = () => {

    let valid = false;
    const min = 2,
        max = 25;
	const fnameEl = document.querySelector('#fname');
    const fname = fnameEl.value.trim();

    if (!isRequired(fname)) {
        showError(fnameEl, 'First name cannot be blank.');
    } else if (!isBetween(fname.length, min, max)) {
        showError(fnameEl, `First name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(fnameEl);
        valid = true;
    }
    return valid;
}

const checkLastName = () => {

    let valid = false;
    const min = 2,
        max = 25;
	const lnameEl = document.querySelector('#lname');
    const lname = lnameEl.value.trim();

    if (!isRequired(lname)) {
        showError(lnameEl, 'Last name cannot be blank.');
    } else if (!isBetween(lname.length, min, max)) {
        showError(lnameEl, `Last name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(lnameEl);
        valid = true;
    }
    return valid;
}

const checkEmail = () => {

    let valid = false;
	const emailEl = document.querySelector('#email');
    const email = emailEl.value.trim();

    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmail(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
}

const checkPassword = () => {

    let valid = false;
	const passwordEl = document.querySelector('#password');
    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPassLength(password)) {
        showError(passwordEl, `Password length must be 8 or more.`)
    } else if (!isPassUpper(password)) {
        showError(passwordEl, `Password must have 1 upper case.`)
    } else if (!isPassLower(password)) {
        showError(passwordEl, `Password must have 1 lower case.`)
    } else if (!isPassNumber(password)) {
        showError(passwordEl, `Password must have 1 number.`)
    } else if (!isPassSpecial(password)) {
        showError(passwordEl, `Password must have 1 special case.`)
    } else {
        showSuccess(passwordEl);
        valid = true;
    }
    return valid;
}

const checkConfirmPassword = () => {

    let valid = false;
    const passwordEl = document.querySelector('#password');
    const password = passwordEl.value.trim();
    const confirmPasswordEl = document.querySelector('#cpassword');
    const confirmPassword = confirmPasswordEl.value.trim();

    if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'Enter valid password.');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }
    return valid;
}