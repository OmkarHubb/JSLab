// ================================================================
// REG/EX PATTERN EXTRACTION MACHINE — script.js
// ================================================================

// ===== DOM =====
const inputParagraph = document.getElementById("inputParagraph");
const analyzeBtn = document.getElementById("analyzeBtn");
const clearBtn = document.getElementById("clearBtn");
const loadSampleBtn = document.getElementById("loadSampleBtn");
const resultsSection = document.getElementById("resultsSection");
const extractedInfo = document.getElementById("extractedInfo");
const emailValidation = document.getElementById("emailValidation");
const phoneValidation = document.getElementById("phoneValidation");
const textStats = document.getElementById("textStats");
const lowercaseText = document.getElementById("lowercaseText");
const replacedText = document.getElementById("replacedText");
const lowerModules = document.getElementById("lowerModules");
const charCountEl = document.getElementById("charCount");
const lineCountEl = document.getElementById("lineCount");
const statusMsg = document.getElementById("statusMsg");
const clockDisplay = document.getElementById("clockDisplay");

// ===== Sample Data =====
const SAMPLE_TEXT = `My name is Omkar Pant, and my PRN number is 72325465001. I am currently enrolled in the Computer Science department. You can contact me via email at omkar.sharma@university.edu or reach me on my phone number 9876543210. I enjoy learning about algorithms, data structures, and web development.`;

// ===== Regular Expressions =====
const REGEX = {
    // Name: "name is <FirstName LastName>" or "Name: <FirstName LastName>"
    name: /(?:my\s+)?name\s+is\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)|name\s*:\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i,

    // PRN number: exactly 11 digits
    rollNumber: /(?:PRN(?:\s+(?:number|no\.?))?\s*(?:is|:)?\s*)(\d{11})\b/i,

    // Email address
    email: /\b([A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,})\b/,

    // Phone: 10-digit, optional country code / prefix
    phone: /(?:\+91[\s-]?|0)?(\d[\d\s\-]{8,}\d)\b/,

    // Department: common CS/IT/etc names
    department: /(?:department\s+of|department\s*:\s*|(?:the\s+)?)((?:computer\s+science|information\s+technology|electronics|mechanical|civil|electrical)(?:\s+(?:and|&)\s+\w+)?(?:\s+engineering)?)/i,

    // Strict email validation
    emailValidation: /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/,

    // Exactly 10 digits
    phoneValidation: /^\d{10}$/,
};

// ===== Live clock =====
function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    clockDisplay.textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// ===== Live char/line counter =====
function updateInputMeta() {
    const val = inputParagraph.value;
    charCountEl.textContent = val.length;
    lineCountEl.textContent = val.split("\n").length;
}
inputParagraph.addEventListener("input", updateInputMeta);

// ===== Builders =====

function buildReadoutItem(label, value) {
    const found = value && value.trim() !== "";
    return `
        <div class="readout-item">
            <div class="readout-label">${label}</div>
            <div class="readout-value ${found ? "" : "empty"}">
                ${found ? value : "— NOT FOUND —"}
            </div>
        </div>`;
}

function buildGauge(value, isValid, passMsg, failMsg) {
    const cls = isValid ? "pass" : "fail";
    const msg = isValid ? passMsg : failMsg;
    return `
        <div class="gauge-value">${value || "— N/A —"}</div>
        <div class="gauge-status ${cls}">
            <span class="gauge-dot"></span>
            ${msg}
        </div>`;
}

function buildStatCell(number, label) {
    return `
        <div class="stat-cell">
            <div class="stat-number">${number}</div>
            <div class="stat-label">${label}</div>
        </div>`;
}

// ===== Core: Analyze =====
function analyzeParagraph() {
    const text = inputParagraph.value.trim();

    if (!text) {
        inputParagraph.style.borderColor = "var(--error)";
        statusMsg.textContent = "ERROR — NO INPUT DATA";
        setTimeout(() => {
            inputParagraph.style.borderColor = "";
            statusMsg.textContent = "AWAITING INPUT...";
        }, 2000);
        return;
    }

    statusMsg.textContent = "PROCESSING...";

    // --- 1. Extract with Regex ---
    const nameMatch = text.match(REGEX.name);
    const rollMatch = text.match(REGEX.rollNumber);
    const emailMatch = text.match(REGEX.email);
    const phoneMatch = text.match(REGEX.phone);
    const deptMatch = text.match(REGEX.department);

    const studentName = nameMatch ? (nameMatch[1] || nameMatch[2] || "").trim() : null;
    const rollNumber = rollMatch ? rollMatch[1].trim() : null;
    const email = emailMatch ? emailMatch[1].trim() : null;
    const rawPhone = phoneMatch ? phoneMatch[1].replace(/[\s\-]/g, "") : null;
    const department = deptMatch ? deptMatch[1].trim() : null;

    // Populate readout
    extractedInfo.innerHTML =
        buildReadoutItem("NAME", studentName) +
        buildReadoutItem("PRN", rollNumber) +
        buildReadoutItem("EMAIL", email) +
        buildReadoutItem("PHONE", rawPhone) +
        buildReadoutItem("DEPT", department);

    // --- 2. Email validation ---
    const emailOk = email ? REGEX.emailValidation.test(email) : false;
    emailValidation.innerHTML = buildGauge(
        email, emailOk,
        "VALID FORMAT",
        email ? "INVALID FORMAT" : "NO EMAIL DETECTED"
    );

    // --- 3. Phone validation (10 digits) ---
    const phoneOk = rawPhone ? REGEX.phoneValidation.test(rawPhone) : false;
    phoneValidation.innerHTML = buildGauge(
        rawPhone, phoneOk,
        `VALID — ${rawPhone ? rawPhone.length : 0} DIGITS`,
        rawPhone
            ? `INVALID — ${rawPhone.length} DIGIT${rawPhone.length !== 1 ? "S" : ""}`
            : "NO PHONE DETECTED"
    );

    // --- 4. Word & character count ---
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const totalWords = words.length;
    const totalCharsNoSpaces = text.replace(/\s/g, "").length;
    const totalChars = text.length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    textStats.innerHTML =
        buildStatCell(totalWords, "WORDS") +
        buildStatCell(totalCharsNoSpaces, "CHARS (NO SPC)") +
        buildStatCell(totalChars, "TOTAL CHARS") +
        buildStatCell(sentences, "SENTENCES");

    // --- 5. Lowercase ---
    lowercaseText.textContent = text.toLowerCase();

    // --- 6. Replace department ---
    const replaced = text.replace(/computer\s+science/gi, "Information Technology");
    replacedText.textContent = replaced;

    // --- 7. Show panels ---
    resultsSection.style.display = "";
    lowerModules.style.display = "";

    statusMsg.textContent = "EXTRACTION COMPLETE ✓";

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ===== Events =====
analyzeBtn.addEventListener("click", analyzeParagraph);

clearBtn.addEventListener("click", () => {
    inputParagraph.value = "";
    resultsSection.style.display = "none";
    lowerModules.style.display = "none";
    statusMsg.textContent = "AWAITING INPUT...";
    updateInputMeta();
    inputParagraph.focus();
});

loadSampleBtn.addEventListener("click", () => {
    inputParagraph.value = SAMPLE_TEXT;
    updateInputMeta();
    inputParagraph.focus();
});

// Ctrl+Enter shortcut
inputParagraph.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
        analyzeParagraph();
    }
});
