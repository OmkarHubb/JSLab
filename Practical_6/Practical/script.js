// Function to reverse the given paragraph
function reversedParagraph() {

    let paragraph = document.getElementById("paragraph").value;

    let reversed = paragraph.split("").reverse().join("");

    document.getElementById("result").innerText = reversed;
}


// Function to verify email using Regular Expression
function validateEmail() {

    let email = document.getElementById("email").value;

    // Regular Expression for email validation
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(email)) {
        document.getElementById("emailResult").innerText =
            "Valid Email Address";
    }
    else {
        document.getElementById("emailResult").innerText =
            "Invalid Email Address";
    }
}