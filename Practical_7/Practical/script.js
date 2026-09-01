let input = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let emptyState = document.getElementById("emptyState");

function updateEmptyState() {
    let items = taskList.querySelectorAll("li");
    emptyState.style.display = items.length === 0 ? "block" : "none";
}

addBtn.addEventListener("click", function () {
    let task = input.value.trim();
    if (task === "") {
        alert("Enter a task");
        return;
    }

    let li = document.createElement("li");
    let span = document.createElement("span");
    let editBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");

    span.innerText = task;
    editBtn.innerText = "✎";
    editBtn.className = "edit";
    deleteBtn.innerText = "✕";
    deleteBtn.className = "delete";

    editBtn.addEventListener("click", function () {
        let newTask = prompt("Edit task:", span.innerText);
        if (newTask != null && newTask.trim() != "") {
            span.innerText = newTask.trim();
        }
    });

    deleteBtn.addEventListener("click", function () {
        li.remove();
        updateEmptyState();
    });

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    // Add li to ul
    taskList.appendChild(li);
    updateEmptyState();

    // Clear input
    input.value = "";
    input.focus();
});

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addBtn.click();
    }
});

updateEmptyState();