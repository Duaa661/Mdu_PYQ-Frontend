// ===============================
// SHOW SEMESTERS
// ===============================
function showSemester() {
  let year = document.getElementById("year").value;
  let semBox = document.getElementById("semBox");
  let semesterSelect = document.getElementById("semester");

  semesterSelect.innerHTML = "<option value=''>-- Choose Semester --</option>";
  document.getElementById("paperBox").style.display = "none";

  if (year === "1st") addSemesters(["1st Sem", "2nd Sem"]);
  else if (year === "2nd") addSemesters(["3rd Sem", "4th Sem"]);
  else if (year === "3rd") addSemesters(["5th Sem", "6th Sem"]);
  else if (year === "4th") addSemesters(["7th Sem", "8th Sem"]);

  if (year !== "") {
    semBox.style.display = "block";
  } else {
    semBox.style.display = "none";
  }
}

function addSemesters(semList) {
  let semesterSelect = document.getElementById("semester");

  semList.forEach(sem => {
    let option = document.createElement("option");
    option.text = sem;
    option.value = sem;
    semesterSelect.add(option);
  });
}

// ===============================
// SHOW PAPERS
// ===============================
function showpaper() {
  let semester = document.getElementById("semester").value;
  let paperBox = document.getElementById("paperBox");
  let paperSelect = document.getElementById("paper");

  paperSelect.innerHTML = "<option value=''>-- Choose Paper --</option>";

  if (semester === "1st Sem")
    addPaper(["C-Programming", "Chemistry", "Mechanical", "Engineering-Mathematics"]);
  else if (semester === "2nd Sem")
    addPaper(["Physics", "Electrical-Engineering", "Engineering-Mathematics"]);
  else if (semester === "3rd Sem")
    addPaper(["DBMS", "DSA", "Python", "Digital-Electronics", "Mathematics-3", "Economics"]);
  else if (semester === "4th Sem")
    addPaper(["Discrete-Mathematics", "COA", "Operating-System", "OOPS", "Organizational-Behaviour", "Environmental-Science"]);
  else if (semester === "5th Sem")
    addPaper(["Computer-Network", "Software-Engineering", "Theory-of-Computation", "Design-Analysis-Algorithm", "Java", "MicroProcessor"]);
  else if (semester === "6th Sem")
    addPaper(["MCW", "MAD", "Advance-Java", "AI", "Compiler-Design", "Data-Science", "Open-Elective-1"]);
  else if (semester === "7th Sem")
    addPaper(["Neural-Network", "Professional-Elective-4", "Professional-Elective-3"]);
  else if (semester === "8th Sem")
    addPaper(["Machine-Learning", "Big-Analytics", "Open-Elective-2"]);

  if (semester !== "") {
    paperBox.style.display = "block";
  } else {
    paperBox.style.display = "none";
  }
}

function addPaper(paperList) {
  let paperSelect = document.getElementById("paper");

  paperList.forEach(paper => {
    let option = document.createElement("option");
    option.text = paper;
    option.value = paper;
    paperSelect.add(option);
  });
}

// ===============================
// FORM SUBMIT (UPLOAD FILE)
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("uploadForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const res = await fetch("http://localhost:5000/api/admin/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        document.getElementById("message").innerHTML =
          "✅ File Uploaded Successfully!";
        form.reset();
        document.getElementById("semBox").style.display = "none";
        document.getElementById("paperBox").style.display = "none";
      } else {
        document.getElementById("message").innerHTML =
          "❌ Upload Failed!";
      }
    } catch (error) {
      document.getElementById("message").innerHTML =
        "❌ Server Error!";
    }
  });
});

// ===============================
// LOGOUT
// ===============================
function logout() {
  localStorage.removeItem("token");
  window.location.href = "admin.html";
}
