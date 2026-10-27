
export function initScheduler() {
    const className = document.getElementById("className");
    const minutes = document.getElementById("minutes");
    const timer = document.getElementById("timer");
    const status = document.getElementById("status");
    const displayClass = document.getElementById("displayClass");

    let interval;
    let timeout;
    let remainingSeconds = 0;

    // Display the remaining time
    function updateTimer() {
        const min = Math.floor(remainingSeconds / 60);
        const sec = remainingSeconds % 60;

        timer.textContent =
            `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    }

    // Start the class countdown
    document.getElementById("startBtn").addEventListener("click", () => {
        clearInterval(interval);
        clearTimeout(timeout);

        const name = className.value.trim();
        const duration = Number(minutes.value);

        if (!name || !minutes.value ||
            !Number.isInteger(duration) ||
            duration < 1 || duration > 1440) {
            alert("Enter a class name and a valid number of minutes.");
            return;
        }

        remainingSeconds = duration * 60;
        displayClass.textContent = name;
        status.textContent = "Time remaining until class starts";

        updateTimer();

        // Update the countdown every second
        interval = setInterval(() => {
            remainingSeconds--;
            updateTimer();

            if (remainingSeconds <= 0) {
                clearInterval(interval);
                status.textContent = "Class starting now!";
                timer.textContent = "00:00";

                // Notify the user when the class starts
                timeout = setTimeout(() => {
                    alert(`It's time for your ${name} class!`);
                }, 100);
            }
        }, 1000);
    });

    // Reset the countdown
    document.getElementById("resetBtn").addEventListener("click", () => {
        clearInterval(interval);
        clearTimeout(timeout);

        remainingSeconds = 0;
        timer.textContent = "00:00";
        status.textContent = "Waiting to start";
        displayClass.textContent = "No class selected";

        className.value = "";
        minutes.value = "";
    });
}
