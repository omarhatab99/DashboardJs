let emailInput  = document.querySelector("[name='email']");
let passwordInput  = document.querySelector("[name='password']");
let validIconEmail = document.getElementById("valid-icon-email");
let validPassPar = document.getElementById("valid-pass-par");
let buttonSubmit = document.querySelector("button");
let validEmailPar = document.getElementById("valid-email-par");
let loginBtn = document.querySelector("form button");
let validAllPar = document.getElementById("errors-valid");
let errors = [];
let users = [];

//check users
if(localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
}

//start validate form

function generateError(targetPar , msg) {
    targetPar.classList.replace("text-muted" , "text-danger");
    targetPar.classList.replace("text-success" , "text-danger");
    buttonSubmit.classList.replace("btn-primary" , "btn-danger");
    buttonSubmit.classList.replace("btn-success" , "btn-danger");
    targetPar.textContent = msg;
    errors.push(msg);
}

//valid valid-par
function validErrors() {
    errors.forEach((error) => {
        let errorElement = document.createElement("li");
        let errorText = document.createTextNode(error);
        //append
        errorElement.appendChild(errorText);
        validAllPar.appendChild(errorElement);
    });
}

//check validate login form
document.forms[0].addEventListener("submit" , function(event) {
    let emailValid = false;
    let passwordValid = false;

    errors.length = 0; //empty errors array

    //check validateError list 
    function checkValidateAllErrors() {
        if(validAllPar.children.length > 0){
            validAllPar.innerHTML = "";
        }
    }
    checkValidateAllErrors();
    //end check validateError list     

    if(emailInput.value === "") {
        generateError(validEmailPar , "email must be required");
        emailValid = false;
    }
    else if(!emailInput.value.includes("@")) {
        generateError(validEmailPar , "this email is not valid");
        emailValid = false;
    }
    else {
        emailValid = true;
        validEmailPar.innerHTML = "";
    }

    //validate password input
    if(passwordInput.value === "") {
        generateError(validPassPar , "password must be required");
        passwordValid = false;
        }
    else if(passwordInput.value.length < 6) {
        generateError(validPassPar , "password must be more than 6 chars");
        passwordValid = false;
        }
    else {
        passwordValid = true;
        validPassPar.innerHTML = "";
    }        
    
    if(emailValid === false || passwordValid === false) {
        event.preventDefault();
    }
    else {
        authentication(event);
    }

    validErrors();

});


//check authentication function
function authentication(event) {
    if(users.some((user) => {return user.email === emailInput.value && user.password === passwordInput.value})) {
        let authenticationUser = users.filter((user) => {return user.email === emailInput.value && user.password === passwordInput.value});
        const {username , age , email} = authenticationUser[0];
        let usrDetails = {username , age , email};
        console.log(usrDetails);
        localStorage.setItem("authentication" , JSON.stringify(usrDetails));
        location.href = "index.html";
    }
    else {
        event.preventDefault();
        errors.push("email or password is invalid");
    }
}


