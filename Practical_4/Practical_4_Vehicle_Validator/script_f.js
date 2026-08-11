function validateVehicle() {
    const input = document.getElementById("regNumber").value.trim().toUpperCase();
    const result = document.getElementById("regResult");

    try {
        if (input === "") {
            throw new Error("Enter registration number");
        }

        const parts = input.split(" ");

        if (parts.length !== 4) {
            throw new Error("Format: MH 12 AB 1234");
        }

        const state = parts[0];
        const district = parts[1];
        const series = parts[2];
        const number = parts[3];

        if (state.length !== 2) {
            throw new Error("Invalid state");
        }

        if (district.length !== 2 || isNaN(district)) {
            throw new Error("Invalid district");
        }

        if (series.length < 1 || series.length > 2) {
            throw new Error("Invalid series");
        }

        if (number.length !== 4 || isNaN(number)) {
            throw new Error("Invalid number");
        }

        for (let ch of state + series) {
            if (ch < "A" || ch > "Z") {
                throw new Error("State and series must contain letters");
            }
        }

        result.innerText = "Valid Registration Number";

    } catch (error) {
        result.innerText = error.message;
    }
}