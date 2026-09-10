// NEXUS FIT // Bio-Lab Gym Admission Script & Validation Engine

document.addEventListener("DOMContentLoaded", function () {
    // Form Elements
    const form = document.getElementById("gymForm");
    const nameInput = document.getElementById("nameInput");
    const sexRadios = document.querySelectorAll('input[name="sex"]');
    const eyeColorSelect = document.getElementById("eyeColorSelect");
    const traitCheckboxes = document.querySelectorAll('input[name="traits"]');
    const athleticDesc = document.getElementById("athleticDesc");
    const skillPills = document.querySelectorAll('.skill-pill');

    // Keycard Preview Elements
    const passTierBadge = document.getElementById("passTierBadge");
    const passMemberName = document.getElementById("passMemberName");
    const passSexVal = document.getElementById("passSexVal");
    const passEyeVal = document.getElementById("passEyeVal");
    const passMemberId = document.getElementById("passMemberId");
    const passTraitsVal = document.getElementById("passTraitsVal");
    const passAthleticDesc = document.getElementById("passAthleticDesc");
    const passStatusText = document.getElementById("passStatusText");
    const avatarIcon = document.getElementById("avatarIcon");

    // Guidance & Result Elements
    const hintText = document.getElementById("hintText");
    const formResult = document.getElementById("formResult");

    // Error Message Elements
    const nameError = document.getElementById("nameError");
    const sexError = document.getElementById("sexError");
    const eyeColorError = document.getElementById("eyeColorError");
    const athleticError = document.getElementById("athleticError");

    // Initialize Eye Color default in preview
    if (eyeColorSelect.value) {
        passEyeVal.innerText = eyeColorSelect.value;
    }

    // Quick Skill Pills Click Handler
    skillPills.forEach(pill => {
        pill.addEventListener("click", function () {
            const textToAdd = this.getAttribute("data-text");
            const currentVal = athleticDesc.value.trim();
            if (currentVal === "") {
                athleticDesc.value = textToAdd;
            } else if (!currentVal.includes(textToAdd)) {
                athleticDesc.value = currentVal + " " + textToAdd;
            }
            athleticDesc.dispatchEvent(new Event("input"));
            athleticDesc.focus();
        });
    });

    // ----------------------------------------------------
    // 1. FOCUS EVENT HANDLERS (Real-Time HUD Telemetry)
    // ----------------------------------------------------
    nameInput.addEventListener("focus", function () {
        hintText.innerText = "IDENTITY MODULE: Provide full legal name for gym access credentialing.";
    });

    sexRadios.forEach(radio => {
        radio.addEventListener("focus", function () {
            hintText.innerText = "CLASSIFICATION MODULE: Select biological sex classification (Male / Female).";
        });
    });

    eyeColorSelect.addEventListener("focus", function () {
        hintText.innerText = "DIAGNOSTIC MODULE: Select your ocular spectrum from the dropdown list.";
    });

    traitCheckboxes.forEach(cb => {
        cb.addEventListener("focus", function () {
            hintText.innerText = "METRIC MODIFIERS: Toggle physical height (over 6ft) or weight (over 200lbs) metrics.";
        });
    });

    athleticDesc.addEventListener("focus", function () {
        hintText.innerText = "ATHLETIC LOG: Type your fitness background or click the quick skill pills above.";
    });

    // ----------------------------------------------------
    // 2. LIVE INPUT HANDLERS (Real-Time Hologram Keycard)
    // ----------------------------------------------------
    nameInput.addEventListener("input", function () {
        const val = nameInput.value.trim();
        passMemberName.innerText = val !== "" ? val.toUpperCase() : "YOUR NAME";
        validateField(nameInput);
    });

    athleticDesc.addEventListener("input", function () {
        const val = athleticDesc.value.trim();
        passAthleticDesc.innerText = val !== "" ? val : "Provide a description in the form to populate your athletic profile.";
        validateField(athleticDesc);
    });

    // ----------------------------------------------------
    // 3. CHANGE EVENT HANDLERS (Dynamic Keycard Updates)
    // ----------------------------------------------------
    sexRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            const selectedSex = document.querySelector('input[name="sex"]:checked');
            if (selectedSex) {
                passSexVal.innerText = selectedSex.value.toUpperCase();
                avatarIcon.innerText = selectedSex.value === "Male" ? "🏋️‍♂️" : "🏋️‍♀️";
            } else {
                passSexVal.innerText = "--";
                avatarIcon.innerText = "👤";
            }
            validateSex();
        });
    });

    eyeColorSelect.addEventListener("change", function () {
        const val = eyeColorSelect.value;
        passEyeVal.innerText = val !== "" ? val : "--";
        validateField(eyeColorSelect);
    });

    traitCheckboxes.forEach(cb => {
        cb.addEventListener("change", updateTraitsPreview);
    });

    function updateTraitsPreview() {
        const selectedTraits = Array.from(traitCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        if (selectedTraits.length > 0) {
            const shortLabels = selectedTraits.map(t => {
                if (t === "Over 6 feet tall") return ">6 ft";
                if (t === "Over 200 pounds") return ">200 lbs";
                return t;
            });
            passTraitsVal.innerText = shortLabels.join(", ");
        } else {
            passTraitsVal.innerText = "None selected";
        }
    }

    // ----------------------------------------------------
    // 4. FIELD BLUR & VALIDATION LOGIC
    // ----------------------------------------------------
    nameInput.addEventListener("blur", () => validateField(nameInput));
    eyeColorSelect.addEventListener("blur", () => validateField(eyeColorSelect));
    athleticDesc.addEventListener("blur", () => validateField(athleticDesc));
    
    sexRadios.forEach(radio => {
        radio.addEventListener("blur", validateSex);
    });

    function validateSex() {
        const selectedSex = document.querySelector('input[name="sex"]:checked');
        if (!selectedSex) {
            sexError.innerText = "Please select biological sex.";
            return false;
        } else {
            sexError.innerText = "";
            return true;
        }
    }

    function validateField(input) {
        let isValid = true;
        let msg = "";

        if (input === nameInput) {
            const val = nameInput.value.trim();
            if (val === "") {
                msg = "Athlete name is required.";
                isValid = false;
            } else if (val.length < 2) {
                msg = "Name must be at least 2 characters.";
                isValid = false;
            }
            setError(nameInput, nameError, msg, isValid);
        }

        if (input === eyeColorSelect) {
            if (eyeColorSelect.value === "") {
                msg = "Please select ocular spectrum.";
                isValid = false;
            }
            setError(eyeColorSelect, eyeColorError, msg, isValid);
        }

        if (input === athleticDesc) {
            const val = athleticDesc.value.trim();
            if (val === "") {
                msg = "Please log your athletic capability.";
                isValid = false;
            } else if (val.length < 5) {
                msg = "Description must be at least 5 characters.";
                isValid = false;
            }
            setError(athleticDesc, athleticError, msg, isValid);
        }

        return isValid;
    }

    function setError(input, errorElement, message, isValid) {
        if (!isValid) {
            errorElement.innerText = message;
            input.classList.add("invalid");
            input.classList.remove("valid");
        } else {
            errorElement.innerText = "";
            input.classList.remove("invalid");
            input.classList.add("valid");
        }
    }

    // ----------------------------------------------------
    // 5. SUBMIT EVENT HANDLER
    // ----------------------------------------------------
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Validate all required fields
        const vName = validateField(nameInput);
        const vSex = validateSex();
        const vEye = validateField(eyeColorSelect);
        const vAthletic = validateField(athleticDesc);

        const formIsValid = vName && vSex && vEye && vAthletic;

        if (formIsValid) {
            const randomId = Math.floor(1000 + Math.random() * 9000);
            const memberIdString = `#IP-${randomId}`;

            passMemberId.innerText = memberIdString;
            passTierBadge.innerText = "NEXUS VIP";
            passTierBadge.className = "card-badge executive";
            passStatusText.innerText = "STATUS: ACTIVE [VERIFIED]";
            passStatusText.style.color = "#00f0ff";

            const memberName = nameInput.value.trim();
            const selectedSex = document.querySelector('input[name="sex"]:checked').value;
            const eyeColor = eyeColorSelect.value;
            const selectedTraits = Array.from(traitCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            const traitsText = selectedTraits.length > 0 ? selectedTraits.join(" & ") : "Standard Metrics";

            formResult.className = "form-result success";
            formResult.innerHTML = `
                <strong>❖ NEXUS GYM ADMISSION APPROVED!</strong><br>
                Welcome to Nexus Gym, <b>${memberName}</b> (${selectedSex}, ${eyeColor} eyes).<br>
                Metrics: <b>${traitsText}</b> | Keypass ID: <b>${memberIdString}</b>.
            `;

            hintText.innerText = "Admission complete! Your Holographic Keypass has been activated.";

            // Reset form fields after 7 seconds
            setTimeout(() => {
                form.reset();
                passMemberName.innerText = "YOUR NAME";
                passSexVal.innerText = "--";
                passEyeVal.innerText = eyeColorSelect.value || "--";
                passMemberId.innerText = "#IP-0000";
                passTraitsVal.innerText = "None selected";
                passAthleticDesc.innerText = "Provide a description in the form to populate your athletic profile.";
                passTierBadge.innerText = "UNVERIFIED";
                passTierBadge.className = "card-badge";
                passStatusText.innerText = "STATUS: PENDING";
                passStatusText.style.color = "";
                avatarIcon.innerText = "👤";
                [nameInput, eyeColorSelect, athleticDesc].forEach(i => i.classList.remove("valid", "invalid"));
            }, 7000);

        } else {
            formResult.className = "form-result error";
            formResult.innerHTML = "<strong>⚠️ System Diagnostic Failed:</strong> Please complete all required console modules.";
            hintText.innerText = "Review highlighted modules and resolve error messages.";
        }
    });
});
