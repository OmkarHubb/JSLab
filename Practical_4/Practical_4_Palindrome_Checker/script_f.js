function createPalindromeChecker() {
    const history = [];

    return function(word) {
        if (!word) return { isValid: false, message: "Please enter a word." };
        
        const cleaned = word.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
        
        const reversed = cleaned.split('').reverse().join('');
        const isPal = (cleaned === reversed);
        
        history.push({ word, isPal });
        console.log("Validation History (Closure):", history);
        
        if (isPal) return { isValid: true, message: `✔ '${word}' is a palindrome!` };
        else return { isValid: false, message: `✖ '${word}' is not a palindrome.` };
    };
}

const palindromeValidator = createPalindromeChecker();

function checkPalindrome() {
    const inputWord = document.getElementById("palindromeInput").value.trim();
    const resultDiv = document.getElementById("palResult");
    
    const result = palindromeValidator(inputWord);
    
    if (result.isValid) {
        resultDiv.className = "result success";
    } else {
        resultDiv.className = "result error";
    }
    resultDiv.innerText = result.message;
}