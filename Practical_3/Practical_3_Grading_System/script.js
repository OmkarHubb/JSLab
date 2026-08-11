const studentNameInput = document.getElementById("studentName");
const prnInput = document.getElementById("prn");
const subjectInput = document.getElementById("subject");
const semesterInput = document.getElementById("semester");
const marksInput = document.getElementById("marks");
const gradeBtn = document.getElementById("gradeBtn");
const gradeResult = document.getElementById("gradeResult");

gradeBtn.addEventListener("click", function () {
  const studentName = studentNameInput.value.trim();
  const prn = prnInput.value.trim();
  const subject = subjectInput.value.trim();
  const semester = semesterInput.value;
  const marks = parseFloat(marksInput.value);

  gradeResult.style.display = "block";
  gradeResult.className = "msg";

  // Validation
  if (!studentName) {
    gradeResult.innerHTML = "⚠️ Please enter the student name.";
    gradeResult.classList.add("msg-error");
    return;
  }

  if (!prn) {
    gradeResult.innerHTML = "⚠️ Please enter the PRN / Roll Number.";
    gradeResult.classList.add("msg-error");
    return;
  }

  if (isNaN(marks) || marks < 0 || marks > 100) {
    gradeResult.innerHTML = "⚠️ Please enter valid marks between 0 and 100.";
    gradeResult.classList.add("msg-error");
    return;
  }

  // Calculate grade
  let grade = "";
  let remark = "";

  if (marks >= 90) {
    grade = "A+";
    remark = "Outstanding";
  } else if (marks >= 80) {
    grade = "A";
    remark = "Excellent";
  } else if (marks >= 70) {
    grade = "B+";
    remark = "Very Good";
  } else if (marks >= 60) {
    grade = "B";
    remark = "Good";
  } else if (marks >= 50) {
    grade = "C";
    remark = "Average";
  } else if (marks >= 40) {
    grade = "D";
    remark = "Below Average";
  } else {
    grade = "F";
    remark = "Fail";
  }

  const isFail = grade === "F";

  gradeResult.classList.add("msg-success");
  gradeResult.innerHTML = `
    <div class="result-header">
      <div class="student-info">
        ${studentName}
        <span>PRN: ${prn}</span>
      </div>
      <div class="grade-badge${isFail ? ' fail' : ''}">${grade}</div>
    </div>
    <div class="result-details">
      <div class="detail-item"><strong>Subject:</strong> ${subject || "—"}</div>
      <div class="detail-item"><strong>Semester:</strong> ${semester ? "Sem " + semester : "—"}</div>
      <div class="detail-item"><strong>Marks:</strong> ${marks} / 100</div>
      <div class="detail-item"><strong>Remark:</strong> ${remark}</div>
    </div>
  `;
});