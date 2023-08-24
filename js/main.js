
let menu = document.getElementById("menu");
let aside = document.querySelector("aside");
let main = document.querySelector("main");
let sidebarLinks = document.querySelectorAll(".sidebar > a:not(:last-child)");
let sections = document.querySelectorAll("main section");
let darkMode = document.querySelectorAll(".dark-mode span");
let profileInfo = document.querySelector(".info b");
let usersList = document.querySelector(".users-list .users");
let courseNameInput = document.getElementById("course-name");
let paymentSelect = document.getElementById("course-payment");
let statusSelect = document.getElementById("course-status");
let validCourseNamePar = document.getElementById("valid-coursename-par");
let validPaymentPar = document.getElementById("valid-payment-par");
let validStatusPar = document.getElementById("valid-status-par");
let createCourse = document.getElementById("create-course");
let saveCourse = document.querySelector("#exampleModal2 [type='submit']");
let deleteCourse = document.querySelector("#exampleModal3 [type='submit']")
let table = document.querySelector("table tbody");
let selectedRow = null;

let users = [];
let user = {};
let courses = [];

//loader
window.onload = function() {
    document.querySelector(".loader").style.display = "none";
}

//check Authentication
if(localStorage.getItem("authentication") && localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
    user = JSON.parse(localStorage.getItem("authentication"));
    profileInfo.innerHTML = user.username;
}
else {
    location.href = "login.html";
}

//logout
document.getElementById("logout").addEventListener(("click") , function() {
    localStorage.removeItem("authentication");
    location.href = "login.html";
});

//check dark mode
if(localStorage.getItem("mode")) {
    if(localStorage.getItem("mode") === "dark")
    {
        document.body.classList.add("dark-mode-variables")
        darkMode.forEach((btn) => btn.classList.remove("active"));
        darkMode[1].classList.add("active");
    }
}

//check courses and get courses from localStorage
if(localStorage.getItem("courses")) {
    courses = JSON.parse(localStorage.getItem("courses"));
}

menu.addEventListener("click" , function() {
    aside.classList.toggle("open");
});

//generate sidebar tabs
sidebarLinks.forEach((sidebarLink) => {
    sidebarLink.addEventListener("click" , function() {
        //remove class active from all 
        sidebarLinks.forEach(link => link.classList.remove("active"));

        //display none for each sections
        sections.forEach((section) => section.style.display = "none");

        //show target section
        document.querySelector(this.dataset.cont).style.display = "block";

        //set class active on target
        this.classList.add("active");
    });
})

//change mode color 
darkMode.forEach((btn) => {
    btn.addEventListener("click" , function(){
        darkMode.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        if(this.dataset.mode === "light") {
            document.body.classList.remove("dark-mode-variables")
            localStorage.setItem("mode" , "light");
        }
        else {
            document.body.classList.add("dark-mode-variables")
            localStorage.setItem("mode" , "dark");
        } 
    });
})

//generate users
users.forEach((user) => {
    let userDiv = document.createElement("div");
    let userHead = document.createElement("h2");
    let userPar = document.createElement("p");
    let userImage = document.createElement("img");

    userHead.innerHTML = user.username;
    userPar.innerHTML = userDate(user);

    //style
    userDiv.classList.add("user");
    userImage.src = "images/profile-2.jpg";

    //append
    userDiv.appendChild(userImage);
    userDiv.appendChild(userHead);
    userDiv.appendChild(userPar);
    usersList.prepend(userDiv);
});

//get date by hours 
function userDate(user) {
    let nowDate = new Date().getTime();
    let DateDifference = nowDate - user.date;
    let hoursAgo = Math.floor((DateDifference / (1000 * 60 * 60)));
    return hoursAgo + " Hours Ago";
}


//display courses from array
function displayCourses() {
    table.innerHTML = "";
    courses.forEach((course) => {
        generateCourseTr(course);
    });
};

displayCourses();

//start validate form

function generateError(targetPar , msg) {
    targetPar.classList.add("text-danger");
    saveCourse.classList.replace("btn-primary" , "btn-danger");
    targetPar.textContent = msg;
}

function generatevalid(targetPar , msg) {
    targetPar.classList.remove("text-danger");
    saveCourse.classList.replace("btn-danger" , "btn-primary");
    targetPar.textContent = msg;
}

//create new Courses 
createCourse.addEventListener("click" , function() {
    saveCourse.dataset.action = "create";
    saveCourse.dataset.course = "none";

    courseNameInput.value = "";
    paymentSelect.value = "";
    statusSelect.value = "";

    document.querySelector(".modal-title-course").innerHTML = "add new course";
    document.getElementById("submit-btn").innerHTML = "create";
})

//get Target course 
function getCourseByNumber(courseNumber) {
    return courses.find((course) => {return course.courseNumber == courseNumber});
}

function getCourseIndex(courseNumber){
    let findCourse = getCourseByNumber(courseNumber);

    return courses.indexOf(findCourse);
}

//update and delete course
window.addEventListener("click" , function(event) {
    if(event.target.id === "edit") { //update
        saveCourse.dataset.action = "update";
        saveCourse.dataset.course = event.target.dataset.course;

        let findCourse = getCourseByNumber(event.target.dataset.course);

        courseNameInput.value = findCourse.courseName;
        paymentSelect.value = findCourse.coursePayment;
        statusSelect.value = findCourse.courseStatus;

        checkValidation();

        document.querySelector(".modal-title-course").innerHTML = "edit course";
        document.getElementById("submit-btn").innerHTML = "update";

        selectedRow = event.target.parentElement.closest("tr");
    }

    if(event.target.id === "delete") { //delete
        let findCourse = getCourseByNumber(event.target.dataset.course);

        console.log(event.target.dataset.course);
        
        document.getElementById("course-name-confirm").innerHTML = findCourse.courseName;

        deleteCourse.dataset.course = event.target.dataset.course;

        selectedRow = event.target.parentElement.closest("tr");
    }
});


//delete course for modal
deleteCourse.addEventListener("click" , function() {
    let findCourseIndex = getCourseIndex(this.dataset.course);

    courses.splice(findCourseIndex , 1);

    //save at localStorage
    localStorage.setItem("courses" , JSON.stringify(courses));

    selectedRow.remove();
    
    selectedRow = null;
});


//create or update courses for modal
saveCourse.addEventListener("click" , function(event) {

    //check validation
    if(checkValidation() === true) { //is valid
        if(this.dataset.action === "update" && selectedRow != null) {

            //update
            let findCourse = getCourseByNumber(this.dataset.course);

            findCourse.courseName = courseNameInput.value;
            findCourse.coursePayment = paymentSelect.value;
            findCourse.courseStatus = statusSelect.value;

            let findCourseIndex = getCourseIndex(this.dataset.course);
            courses.splice(findCourseIndex , 1 , findCourse);

            selectedRow.children[0].textContent = findCourse.courseName;
            selectedRow.children[2].textContent = findCourse.coursePayment;
            selectedRow.children[3].textContent = findCourse.courseStatus;



            switch(findCourse.courseStatus) {
                case "Pending": 
                    selectedRow.children[3].className = "text-warning";
                    break;
                case "Declined":
                    selectedRow.children[3].className = "text-danger";
                    break;
                case "Active": 
                    selectedRow.children[3].className = "text-primary";
                    break;
                default: 
                    selectedRow.children[3].className = "text-dark";
                    break;
            }

            selectedRow = null;
        }
        else {

            let course = {
                courseName: courseNameInput.value,
                courseNumber: courseIdGenerate(),
                coursePayment: paymentSelect.value,
                courseStatus: statusSelect.value,
            }

            //create
            courses.push(course);

            generateCourseTr(course);

        }
        
        //save at localStorage
        localStorage.setItem("courses" , JSON.stringify(courses));

        event.preventDefault();

        this.previousElementSibling.click();
        
    }
    else {
        event.preventDefault();
    }

});

function generateCourseTr(course) {
    //create table raw
    let tr = document.createElement("tr");

    //generate array of values of course
    let courseInfo = Object.values(course);

    //create four table data
    for (let index = 0; index < courseInfo.length; index++) {

        let td = document.createElement("td");
        let tdData = document.createTextNode(courseInfo[index]);

        //style
        if(index === 3) {
            switch(tdData.nodeValue) {
                case "Pending": 
                    td.classList.add("text-warning");
                    break;
                case "Declined":
                    td.classList.add("text-danger");
                    break;
                case "Active": 
                    td.classList.add("text-primary");
                    break;
                default: 
                    td.classList.add("text-dark");
                    break;
            }
        }

        //append 
        td.appendChild(tdData);
        tr.appendChild(td);
    }

        //create table buttons actions
        let actionsTd = document.createElement("td");
        let editButton = document.createElement("button");
        let deleteButton = document.createElement("button");


        //buttons Style 
        editButton.innerHTML = "edit";
        editButton.classList.add("btn" , "btn-warning" , "btn-sm" , "me-2");
        editButton.id = "edit";
        editButton.setAttribute("data-course" , course.courseNumber);
        editButton.setAttribute("data-bs-toggle" , "modal");
        editButton.setAttribute("data-bs-target" , "#exampleModal2");
        deleteButton.innerHTML = "delete";
        deleteButton.classList.add("btn" , "btn-danger" , "btn-sm");
        deleteButton.id = "delete";
        deleteButton.setAttribute("data-course" , course.courseNumber);
        deleteButton.setAttribute("data-bs-toggle" , "modal");
        deleteButton.setAttribute("data-bs-target" , "#exampleModal3");

        //append
        actionsTd.appendChild(editButton);
        actionsTd.appendChild(deleteButton);
        tr.appendChild(actionsTd);

        //append tr to table
        table.appendChild(tr);    
}

function checkValidation() {
        //check validation
        let courseNameValid = false;
        let coursePaymentValid = false;
        let courseStatusValid = false;
    
        if(courseNameInput.value === "") {
            generateError(validCourseNamePar , "course name must be required");
        }
        else {
            courseNameValid = true;
            generatevalid(validCourseNamePar , "please enter course name is required");
        }
    
        if(paymentSelect.value === "") {
            generateError(validPaymentPar , "payment way must be required");
        }
        else 
        {
            coursePaymentValid = true;
            generatevalid(validPaymentPar , "please enter payment way is required")
        }
    
        if(statusSelect.value === "") {
            generateError(validStatusPar , "status must be required");
        }
        else {
            courseStatusValid = true;
            generatevalid(validStatusPar , "please enter status is required");
        }
    
        if(courseNameValid === false || coursePaymentValid === false || courseStatusValid === false){
            return false;
        }
        else {
            return true;
        }
}

function courseIdGenerate() {
    let numbers = "0123456789";
    let numberCount = 5;
    let serialNumber = "";

    for (let index = 0; index < numberCount; index++) {
        
        serialNumber += numbers[Math.floor(Math.random() * numbers.length)];
    }

    return parseInt(serialNumber);
}

