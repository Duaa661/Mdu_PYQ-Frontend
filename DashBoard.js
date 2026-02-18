const token = localStorage.getItem("token");
const form = document.getElementById("uploadForm");

if (!token) {
  window.location.href = "admin.html";
}

// Verify token
fetch("http://localhost:5000/api/admin/dashboard", {
  headers: {
    "Authorization": "Bearer " + token
  }
})
.then(res => {
  if (!res.ok) {
    localStorage.removeItem("token");
    window.location.href = "admin.html";
  }
});

function logout() {
  localStorage.removeItem("token");
  window.location.href = "admin.html";
}

// Upload Form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const res = await fetch("http://localhost:5000/api/admin/upload", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
    body: formData
  });

  const data = await res.json();
  alert(data.message);
});

// Show Semester Based on Year
function showSemester() {
  let year = document.getElementById("year").value;
  let semBox = document.getElementById("semBox");
  let semesterSelect = document.getElementById("semester");

  semesterSelect.innerHTML = "<option value=''>-- Choose Semester --</option>";

  if (year === "") {
    semBox.style.display = "none";
    return;
  }

  if (year === "1st") {
    addSemesters(["1st Sem", "2nd Sem"]);
  }
  else if (year === "2nd") {
    addSemesters(["3rd Sem", "4th Sem"]);
  }
  else if (year === "3rd") {
    addSemesters(["5th Sem", "6th Sem"]);
  }
  else if (year === "4th") {
    addSemesters(["7th Sem", "8th Sem"]);
  }

  semBox.style.display = "block";
}

// Helper Function
function addSemesters(semesters) {
  let semesterSelect = document.getElementById("semester");

  semesters.forEach(sem => {
    let option = document.createElement("option");
    option.value = sem;
    option.textContent = sem;
    semesterSelect.appendChild(option);
  });
}
