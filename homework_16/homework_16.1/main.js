class Student {
  constructor(name, lastname, birthYear, grades = []) {
    this.name = name;
    this.lastname = lastname;
    this.birthYear = birthYear;
    this.grades = grades;
    this.attendance = new Array(25).fill(null);
    this.attendanceIndex = 0;
  }

  getAge() {
    return new Date().getFullYear() - this.birthYear;
  }

  getAverageGrade() {
    if (this.grades.length === 0) return 0;
    return (
      this.grades.reduce((sum, grade) => sum + grade, 0) / this.grades.length
    );
  }

  present() {
    if (this.attendanceIndex < this.attendance.length)
      this.attendance[this.attendanceIndex++] = true;
  }

  absent() {
    if (this.attendanceIndex < this.attendance.length)
      this.attendance[this.attendanceIndex++] = false;
  }

  getAttendanceRate() {
    const attended = this.attendance.filter((value) => value === true).length;
    return this.attendanceIndex === 0 ? 0 : attended / this.attendanceIndex;
  }

  summary() {
    const avgGrade = this.getAverageGrade();
    const avgAttendance = this.getAttendanceRate();

    if (avgGrade > 90 && avgAttendance > 0.9) {
      return "Молодець!";
    } else if (avgGrade > 80 || avgAttendance > 0.8) {
      return "Добре, але можна краще";
    } else {
      return "Редиска!";
    }
  }
}

const student1 = new Student("Іван", "Петров", 2000, [95, 92, 88, 100]);
const student2 = new Student("Марія", "Іванова", 2002, [85, 80, 78, 90]);
const student3 = new Student("Олег", "Сидоров", 2001, [70, 60, 65, 75]);

for (let i = 0; i < 24; i++) student1.present();
for (let i = 0; i < 1; i++) student1.absent();

for (let i = 0; i < 20; i++) student2.present();
for (let i = 0; i < 5; i++) student2.absent();

for (let i = 0; i < 10; i++) student3.present();
for (let i = 0; i < 15; i++) student3.absent();

console.log(
  `${student1.name} ${
    student1.lastname
  }, Вік: ${student1.getAge()}, Середній бал: ${student1.getAverageGrade()}, Відвідуваність: ${student1.getAttendanceRate()}, Оцінка: ${student1.summary()}`
);
console.log(
  `${student2.name} ${
    student2.lastname
  }, Вік: ${student2.getAge()}, Середній бал: ${student2.getAverageGrade()}, Відвідуваність: ${student2.getAttendanceRate()}, Оцінка: ${student2.summary()}`
);
console.log(
  `${student3.name} ${
    student3.lastname
  }, Вік: ${student3.getAge()}, Середній бал: ${student3.getAverageGrade()}, Відвідуваність: ${student3.getAttendanceRate()}, Оцінка: ${student3.summary()}`
);

/* Варіант 2 розширена версія

class Student {
  constructor(
    firstName,
    lastName,
    birthYear,
    initialGrades = [],
    attendance = []
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
    this.grades = initialGrades;
    this.attendance = attendance.length ? attendance : new Array(25).fill(null);
  }

  getAge() {
    return new Date().getFullYear() - this.birthYear;
  }

  getAverageGrade() {
    const validGrades = this.grades.filter(
      (grade) => grade !== null && grade >= 0 && grade <= 100
    );
    return validGrades.length
      ? (validGrades.reduce((a, b) => a + b, 0) / validGrades.length).toFixed(2)
      : 0;
  }

  present() {
    let index = this.attendance.findIndex((v) => v === null);
    if (index !== -1) {
      this.attendance[index] = true;
      saveData();
    }
  }

  absent() {
    let index = this.attendance.findIndex((v) => v === null);
    if (index !== -1) {
      this.attendance[index] = false;
      saveData();
    }
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
    const attended = this.attendance.filter((v) => v === true).length;
    const total = this.attendance.filter((v) => v !== null).length;
    const attendanceRate = total ? (attended / total) * 100 : 0;

    if (isNaN(attendanceRate)) attendanceRate = 0;

    if (avgGrade > 90 && attendanceRate > 90) return "Молодець!";
    if (avgGrade > 80 || attendanceRate > 80) return "Добре, але можна краще";
    if (avgGrade > 70 || attendanceRate > 70)
      return "Непогано, але є над чим працювати";
    return "Редиска!";
  }
}

function saveData() {
  localStorage.setItem(
    "students",
    JSON.stringify(
      students.map((student) => ({
        firstName: student.firstName,
        lastName: student.lastName,
        birthYear: student.birthYear,
        grades: student.grades,
        attendance: student.attendance,
      }))
    )
  );
}

function loadData() {
  const data = localStorage.getItem("students");
  if (data) {
    students = JSON.parse(data).map(
      (s) =>
        new Student(
          s.firstName,
          s.lastName,
          s.birthYear,
          s.grades,
          s.attendance
        )
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
    saveData();
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
        alert("Невірні оцінки. Будь ласка, введіть числа між 0 і 100.");
        this.textContent = students[index].grades.join(", ");
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
    birthYear < new Date().getFullYear() &&
    grades.length > 0
  ) {
    let student = new Student(firstName, lastName, birthYear, grades);
    student.attendance = new Array(25).fill(null);
    students.push(student);
    saveData();
    renderTable();
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("birthYear").value = "";
    document.getElementById("grades").value = "";
  } else {
    alert("Будь ласка, введіть правильні дані, включаючи оцінки!");
  }
}

function addGrade(index) {
  let newGrade = parseInt(document.getElementById(`newGrade-${index}`).value);
  const attendanceCount = students[index].attendance.filter(
    (v) => v === true
  ).length;

  if (!isNaN(newGrade) && newGrade >= 0 && newGrade <= 100) {
    if (students[index].grades.length < attendanceCount) {
      students[index].grades.push(newGrade);
      updateRow(index);
    } else {
      alert("Не можна додавати більше оцінок, ніж кількість присутніх.");
    }
  } else {
    alert("Будь ласка, введіть оцінку від 0 до 100.");
  }
}

renderTable();
*/
