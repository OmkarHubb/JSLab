const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const form = document.getElementById("registerForm");
const successMsg = document.getElementById("successMsg");
const errorMsg = document.getElementById("errorMsg");

function validateLive() {

  let pw = password.value;
  let cpw = confirmPassword.value;

  let hasUpper = false;
  let hasLower = false;
  let hasDigit = false;
  let hasSpecial = false;

  for (let i = 0; i < pw.length; i++) {

    let ch = pw[i];

    if (ch >= 'A' && ch <= 'Z')
      hasUpper = true;

    else if (ch >= 'a' && ch <= 'z')
      hasLower = true;

    else if (ch >= '0' && ch <= '9')
      hasDigit = true;

    else if ("!@#$%^&*".includes(ch))
      hasSpecial = true;
  }

  if (pw.length == 0)
    document.getElementById("ruleLength").className = "";
  else if (pw.length >= 8)
    document.getElementById("ruleLength").className = "pass";
  else
    document.getElementById("ruleLength").className = "fail";

  if (pw.length == 0)
    document.getElementById("ruleUpper").className = "";
  else if (hasUpper)
    document.getElementById("ruleUpper").className = "pass";
  else
    document.getElementById("ruleUpper").className = "fail";

  if (pw.length == 0)
    document.getElementById("ruleLower").className = "";
  else if (hasLower)
    document.getElementById("ruleLower").className = "pass";
  else
    document.getElementById("ruleLower").className = "fail";

  if (pw.length == 0)
    document.getElementById("ruleDigit").className = "";
  else if (hasDigit)
    document.getElementById("ruleDigit").className = "pass";
  else
    document.getElementById("ruleDigit").className = "fail";

  if (pw.length == 0)
    document.getElementById("ruleSpecial").className = "";
  else if (hasSpecial)
    document.getElementById("ruleSpecial").className = "pass";
  else
    document.getElementById("ruleSpecial").className = "fail";

  if (cpw.length == 0)
    document.getElementById("ruleMatch").className = "";
  else if (pw == cpw)
    document.getElementById("ruleMatch").className = "pass";
  else
    document.getElementById("ruleMatch").className = "fail";
}

password.addEventListener("input", validateLive);
confirmPassword.addEventListener("input", validateLive);

form.addEventListener("submit", function (e) {

  e.preventDefault();

  successMsg.style.display = "none";
  errorMsg.style.display = "none";

  let pw = password.value;
  let cpw = confirmPassword.value;

  let hasUpper = false;
  let hasLower = false;
  let hasDigit = false;
  let hasSpecial = false;

  for (let i = 0; i < pw.length; i++) {

    let ch = pw[i];

    if (ch >= 'A' && ch <= 'Z')
      hasUpper = true;

    else if (ch >= 'a' && ch <= 'z')
      hasLower = true;

    else if (ch >= '0' && ch <= '9')
      hasDigit = true;

    else if ("!@#$%^&*".includes(ch))
      hasSpecial = true;
  }

  let errors = "";

  if (pw.length < 8)
    errors += "• Password must be at least 8 characters long.<br>";

  if (!hasUpper)
    errors += "• Password must contain an uppercase letter.<br>";

  if (!hasLower)
    errors += "• Password must contain a lowercase letter.<br>";

  if (!hasDigit)
    errors += "• Password must contain a digit.<br>";

  if (!hasSpecial)
    errors += "• Password must contain a special character.<br>";

  if (pw != cpw)
    errors += "• Passwords do not match.<br>";

  if (errors != "") {
    errorMsg.innerHTML = errors;
    errorMsg.style.display = "block";
  } else {
    alert("Registration Successful!");
    successMsg.style.display = "block";
  }

});