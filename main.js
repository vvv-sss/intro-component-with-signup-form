// === Global Variables ==========================================================
// ===============================================================================

const submitBtn = document.getElementById("sign-up-form__submit-btn");
const form = document.getElementById("sign-up-form");
const formLoader = document.getElementById("sign-up-form__loader");
const inputFirstName = document.getElementById("sign-up-form__input-first-name");
const inputLastName = document.getElementById("sign-up-form__input-last-name");
const inputEmail = document.getElementById("sign-up-form__input-email");
const inputPassword = document.getElementById("sign-up-form__input-password");

// === Global Functions ==========================================================
// ===============================================================================

// Function to style input field on error 

const styleError = element => {
    element.style.border = "2px solid var(--clr-primary-100)";
    element.setAttribute("placeholder", "");
    element.nextElementSibling.style.display = "block";
    element.nextElementSibling.nextElementSibling.style.display = "block";
}

const backToDefaultStyle = element => {
    element.style.border = "1px solid var(--clr-neutral-for-input-borders)";
    element.nextElementSibling.style.display = "none";
    element.nextElementSibling.nextElementSibling.style.display = "none";
}

// Function to change style of Name Inputs

const checkNameInput = element => {
    const valueToCheck = element.value;
    const regExp = /^\s*$/;
    regExp.test(valueToCheck) ? styleError(element) : backToDefaultStyle(element);
}

// Function to style email input field

let emailSyntaxValid = true;

const checkEmailInput = element => {
    const valueToCheck = element.value;
    const regExp = /^\s*$/;

    if (regExp.test(valueToCheck) && emailSyntaxValid) {
        styleError(element);
    } else if (!emailSyntaxValid && !regExp.test(valueToCheck)) {
        styleError(element);
        element.nextElementSibling.nextElementSibling.innerHTML = "Looks like this is not an email";
    } else if (emailSyntaxValid && !emailSyntaxValid) {
        backToDefaultStyle(element);
    }
}

// Email validation via fetch API (API Layer)

const validateEmail = element => {

    const url = "https://api.apilayer.com/email_verification/";
    const emailToCheck = inputEmail.value;
    const myHeaders = new Headers();
    myHeaders.append("apikey", "6R1vHb4sg8cfdadXpZTtp0HtopUZMZ0V");

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    }

    fetch(`${url}${emailToCheck}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            const obj = JSON.parse(result);
            if (obj.message === "Invalid email syntax.") {
                emailSyntaxValid = false;
            }
            checkEmailInput(element);
            formLoader.style.zIndex = "-1";
        })
        .catch(error => console.log('error', error));

}

// Function to style password input field

const checkPasswordInput = element => {
    const valueToCheck = element.value;
    const regExp = /^\s*$/;

    if (regExp.test(valueToCheck)) {
        styleError(element);
        element.nextElementSibling.nextElementSibling.innerHTML = "Password cannot be empty";
    } else if (element.value.length < 8 && !regExp.test(valueToCheck)) {
        styleError(element);
        element.nextElementSibling.nextElementSibling.innerHTML = "Password should be at least 8 symbols long";
    } else if (element.value.length >= 8 && !regExp.test(valueToCheck)) {
        backToDefaultStyle(element);
    }

}

// === Submit Button Event ======================================================
// ==============================================================================

submitBtn.addEventListener("click", event => event.preventDefault());

submitBtn.addEventListener("click", ()=> {
    formLoader.style.zIndex = "1";
    checkNameInput(inputFirstName);
    checkNameInput(inputLastName);
    validateEmail(inputEmail);
    checkPasswordInput(inputPassword);
});
