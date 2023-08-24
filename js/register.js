
//variables
let userInput  = document.querySelector("[name='userName']");
let ageInput  = document.querySelector("[name='age']");
let emailInput  = document.querySelector("[name='email']");
let passwordInput  = document.querySelector("[name='password']");
let validAllPar = document.getElementById("errors-valid");
let validNamePar = document.getElementById("valid-username-par");
let validAgePar = document.getElementById("valid-age-par");
let validEmailPar = document.getElementById("valid-email-par");
let validPassPar = document.getElementById("valid-pass-par");
let validIconName = document.getElementById("valid-icon-name");
let validIconAge = document.getElementById("valid-icon-age");
let validIconEmail = document.getElementById("valid-icon-email");
let validIconPass = document.getElementById("valid-icon-pass");
let buttonSubmit = document.getElementById("register-btn");
let errors = [];
let users = [];

//check users array
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

    function generatevalid(targetPar , msg) {
        targetPar.classList.replace("text-danger" , "text-success");
        targetPar.classList.replace("text-muted" , "text-success");
        buttonSubmit.classList.replace("btn-danger" , "btn-success");
        buttonSubmit.classList.replace("btn-primary" , "btn-success");
        targetPar.textContent = msg;
    }

    //validate userInput on fly
    userInput.onkeyup = function() {
        if(userInput.value === "") {
            errors.length = 0; //empty error array
            generateError(validNamePar , "username must be required");
            userInput.className = "border-invalid";
            validIconName.style.opacity = "0";
            validIconName.style.right = "-10%";
        }
        else if(userInput.value.length > 10) {
            errors.length = 0; //empty error array
            generateError(validNamePar , "username more than 10 chars");
            userInput.className = "border-invalid";
            validIconName.style.opacity = "0";
            validIconName.style.right = "-10%";
        }
        else {
            errors.length = 0; //empty error array
            generatevalid(validNamePar , "username is valid");
            userInput.className = "border-valid";
            validIconName.style.opacity = "1";
            validIconName.style.right = "1%";
        }
    }

    //validate ageInput on fly
    ageInput.onkeyup = function() {
        if(ageInput.value === "") {
            errors.length = 0; //empty error array
            generateError(validAgePar , "age must be required");
            ageInput.className = "border-invalid";
            validIconAge.style.opacity = "0";
            validIconAge.style.right = "-10%";
        }
        else if(ageInput.value < 18 || ageInput.value > 70) {
            errors.length = 0; //empty error array
            generateError(validAgePar , "age must be between 18 and 70");
            ageInput.className = "border-invalid";
            validIconAge.style.opacity = "0";
            validIconAge.style.right = "-10%";
        }
        else if(isNaN(ageInput.value)) {
            errors.length = 0; //empty error array
            generateError(validAgePar , "age must be numbers");
            ageInput.className = "border-invalid";
            validIconAge.style.opacity = "0";
            validIconAge.style.right = "-10%";
        }
        else {
            errors.length = 0; //empty error array
            generatevalid(validAgePar , "age is valid");
            ageInput.className = "border-valid";
            validIconAge.style.opacity = "1";
            validIconAge.style.right = "1%";
        }
    }

    //validate emailInput on fly
    emailInput.onkeyup = function() {
        if(emailInput.value === "") {
            errors.length = 0; //empty error array
            generateError(validEmailPar , "email must be required");
            emailInput.className = "border-invalid";
            validIconEmail.style.opacity = "0";
            validIconEmail.style.right = "-10%";
        }
        else if(!emailInput.value.includes("@")) {
            errors.length = 0; //empty error array
            generateError(validEmailPar , "this email is invalid");
            emailInput.className = "border-invalid";
            validIconEmail.style.opacity = "0";
            validIconEmail.style.right = "-10%";
        }
        else {
            errors.length = 0; //empty error array
            generatevalid(validEmailPar , "email is valid");
            emailInput.className = "border-valid";
            validIconEmail.style.opacity = "1";
            validIconEmail.style.right = "1%";
        }
    }   
    
    //validate passwordInput on fly
    passwordInput.onkeyup = function() {
        if(passwordInput.value === "") {
            errors.length = 0; //empty error array
            generateError(validPassPar , "password must be required");
            passwordInput.className = "border-invalid";
            validIconPass.style.opacity = "0";
            validIconPass.style.right = "-10%";
        }
        else if(passwordInput.value.length < 6) {
            errors.length = 0; //empty error array
            generateError(validPassPar , "password must be more than 6 chars");
            passwordInput.className = "border-invalid";
            validIconPass.style.opacity = "0";
            validIconPass.style.right = "-10%";
        }
        else {
            errors.length = 0; //empty error array
            generatevalid(validPassPar , "password is valid");
            passwordInput.className = "border-valid";
            validIconPass.style.opacity = "1";
            validIconPass.style.right = "1%";
        }
    }  

    document.forms[0].onsubmit = function(event) {        
        let userValid = false;
        let ageValid = false;
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

        //validate username input
        if(userInput.value === "") {
            generateError(validNamePar , "username must be required");
            userValid = false;
        }
        else if(userInput.value.length > 10) {
            generateError(validNamePar , "username more than 10 chars");
            userValid = false;
        }
        else {
            generatevalid(validNamePar , "username is valid");
            userValid = true;
        }

        //validate age input
        if(ageInput.value === "") {
            generateError(validAgePar , "age must be required");
            ageValid = false;
        }
        else if(ageInput.value < 18 || ageInput.value > 70) {
            generateError(validAgePar , "age must be between 18 and 70");
            ageValid = false;
        }
        else if(isNaN(ageInput.value)) {
            generateError(validAgePar , "age must be numbers");
            ageValid = false;
        }
        else {
            generatevalid(validAgePar , "age is valid");
            ageValid = true;
        }

        //validate email input
        if(emailInput.value === "") {
            generateError(validEmailPar , "email must be required");
            emailValid = false;
        }
        else if(!emailInput.value.includes("@")) {
            generateError(validEmailPar , "this email is not valid");
            emailValid = false;
        }
        else {
            generatevalid(validEmailPar , "email is valid");
            emailValid = true;
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
            generatevalid(validPassPar , "password is valid");
            passwordValid = true;
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

        validErrors();

        if(userValid === false || ageValid === false || emailValid === false || passwordValid === false) {
            event.preventDefault();
            console.log("omar");
        }
        else {
            let user = {
                username: userInput.value,
                age: ageInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                date: new Date().getTime()
            }
            //store in users array
            users.push(user);
            //save in localStorage
            localStorage.setItem("users" , JSON.stringify(users));
            location.href = "login.html";
        }
    }
//end validate form