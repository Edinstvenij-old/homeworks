class Student {
  constructor(firstName, lastName, birthYear, initialGrades = []) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
    this.grades = initialGrades;
    this.attendance = new Array(25).fill(null);
  }

  getAge() {
    return new Date().getFullYear() - this.birthYear;
  }

  getAverageGrade() {
    return this.grades.length
      ? (this.grades.reduce((a, b) => a + b, 0) / this.grades.length).toFixed(2)
      : 0;
  }

  present() {
    let index = this.attendance.findIndex((v) => v === null);
    if (index !== -1) this.attendance[index] = true;
  }

  absent() {
    let index = this.attendance.findIndex((v) => v === null);
    if (index !== -1) this.attendance[index] = false;
  }

  getAttendanceRate() {
    const attended = this.attendance.filter((v) => v === true).length;
    const absent = this.attendance.filter((v) => v === false).length;
    const total = attended + absent;
    const percentage = total ? ((attended / total) * 100).toFixed(2) : 0;
    return `${attended} присутніх / ${absent} відсутніх (${percentage}%)`;
  }

  summary() {
    const avgGrade = parseFloat(this.getAverageGrade());
    const attendanceRate =
      (this.attendance.filter((v) => v === true).length /
        this.attendance.filter((v) => v !== null).length) *
      100;

    if (avgGrade > 90 && attendanceRate > 90) return "Молодець!";
    if (avgGrade > 80 || attendanceRate > 80) return "Добре, але можна краще";
    return "Редиска!";
  }
}

function saveData() {
  localStorage.setItem("students", JSON.stringify(students));
}

function loadData() {
  const data = localStorage.getItem("students");
  if (data) {
    students = JSON.parse(data).map(
      (s) => new Student(s.firstName, s.lastName, s.birthYear, s.grades)
    );
  }
}

let students = [];
loadData();

function renderTable() {
  let tbody = document.querySelector("#studentsTable tbody");
  let fragment = document.createDocumentFragment();
  tbody.innerHTML = "";

  students.forEach((student, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td>${student.getAge()}</td>
      <td class="editable" contenteditable="true" data-index="${index}">${student.grades.join(
      ", "
    )}</td>
      <td><input type="number" id="newGrade-${index}" min="0" max="100" />
      <button onclick="addGrade(${index})">➕</button></td>
      <td id="avgGrade-${index}">${student.getAverageGrade()}</td>
      <td id="attendance-${index}">${student.getAttendanceRate()}</td>
      <td>
        <button onclick="students[${index}].present(); updateRow(${index})">✓</button>
        <button onclick="students[${index}].absent(); updateRow(${index})">✗</button>
      </td>
      <td id="summary-${index}">${student.summary()}</td>
      <td><button onclick="deleteStudent(${index})">🗑 Видалити</button></td>
    `;
    fragment.appendChild(row);
  });

  tbody.appendChild(fragment);
  enableInlineEditing();
  saveData();
}

function updateRow(index) {
  document.getElementById(`avgGrade-${index}`).textContent =
    students[index].getAverageGrade();
  document.getElementById(`attendance-${index}`).textContent =
    students[index].getAttendanceRate();
  document.getElementById(`summary-${index}`).textContent =
    students[index].summary();
  saveData();
}

function deleteStudent(index) {
  if (
    confirm(`Ви впевнені, що хочете видалити ${students[index].firstName}?`)
  ) {
    students.splice(index, 1);
    renderTable();
  }
}

function enableInlineEditing() {
  document.querySelectorAll(".editable").forEach((cell) => {
    cell.addEventListener("blur", function () {
      let index = this.dataset.index;
      let gradesArray = this.textContent
        .split(",")
        .map((grade) => parseInt(grade.trim()))
        .filter((grade) => !isNaN(grade) && grade >= 0 && grade <= 100);

      if (gradesArray.length > 0) {
        students[index].grades = gradesArray;
        updateRow(index);
      } else {
        alert("Невірні оцінки.");
        renderTable();
      }
    });
  });
}

function addStudent() {
  let firstName = document.getElementById("firstName").value.trim();
  let lastName = document.getElementById("lastName").value.trim();
  let birthYear = parseInt(document.getElementById("birthYear").value);
  let grades = document
    .getElementById("grades")
    .value.split(",")
    .map((grade) => parseInt(grade.trim()))
    .filter((grade) => !isNaN(grade) && grade >= 0 && grade <= 100);

  if (
    firstName &&
    lastName &&
    !isNaN(birthYear) &&
    birthYear > 1900 &&
    birthYear < new Date().getFullYear()
  ) {
    students.push(new Student(firstName, lastName, birthYear, grades));
    saveData();
    renderTable();
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("birthYear").value = "";
    document.getElementById("grades").value = "";
  } else {
    alert("Будь ласка, введіть правильні дані!");
  }
}

function addGrade(index) {
  let newGrade = parseInt(document.getElementById(`newGrade-${index}`).value);
  if (!isNaN(newGrade) && newGrade >= 0 && newGrade <= 100) {
    students[index].grades.push(newGrade);
    updateRow(index);
    renderTable();
  } else {
    alert("Будь ласка, введіть оцінку від 0 до 100.");
  }
}

renderTable();
