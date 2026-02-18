function showYear() {
  let branch = document.getElementById("branch").value;

  if (branch !== "") {
    document.getElementById("yearBox").style.display = "block";
  }
}

function showSemester() {
  let year = document.getElementById("year").value;
  let semBox = document.getElementById("semBox");
  let semesterSelect = document.getElementById("semester");

  semesterSelect.innerHTML = "<option value=''>-- Choose Semester --</option>";

  if (year === "1st") addSemesters(["1st Sem", "2nd Sem"]);
  else if (year === "2nd") addSemesters(["3rd Sem", "4th Sem"]);
  else if (year === "3rd") addSemesters(["5th Sem", "6th Sem"]);
  else if (year === "4th") addSemesters(["7th Sem", "8th Sem"]);

  semBox.style.display = "block";
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

async function showDownload() {
  let branch = document.getElementById("branch").value.toLowerCase();
  let year = document.getElementById("year").value.toLowerCase();
  let semester = document.getElementById("semester").value.toLowerCase();

  if (!branch || !year || !semester) return;

  document.getElementById("downloadBox").style.display = "block";

  const res = await fetch(
    `http://localhost:5000/api/papers?branch=${encodeURIComponent(branch)}&year=${encodeURIComponent(year)}&semester=${encodeURIComponent(semester)}`
  );

  const data = await res.json();

  const paperList = document.getElementById("paperList");
  paperList.innerHTML = "";

  if (!data || data.length === 0) {
    paperList.innerHTML =
      "<p style='color:red;'>Question paper and solution are not uploaded. Please contact admin.</p>";
    return;
  }

  data.forEach((item) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <p><strong>${item.type.toUpperCase()}</strong></p>
      <button onclick="downloadFile('${item.fileUrl}')">
        Download ${item.type}
      </button>
      <hr/>
    `;

    paperList.appendChild(div);
  });
}

// Force download function
function downloadFile(fileName) {
  window.location.href =
    `http://localhost:5000/api/download/${fileName}`;
}

// Admin Download Question
async function downloadPaper() {
  let branch = document.getElementById("branch").value.toLowerCase();
  let year = document.getElementById("year").value.toLowerCase();
  let semester = document.getElementById("semester").value.toLowerCase();

  const res = await fetch(
    `http://localhost:5000/api/admin/papers?branch=${encodeURIComponent(branch)}&year=${encodeURIComponent(year)}&semester=${encodeURIComponent(semester)}&type=question`
  );

  const data = await res.json();

  if (!data || data.length === 0) {
    document.getElementById("result").innerHTML =
      "❌ No Question Paper Available";
    return;
  }

  window.location.href =
    `http://localhost:5000/api/download/${data[0].fileUrl}`;
}

// Admin Download Solution
async function downloadSolution() {
  let branch = document.getElementById("branch").value.toLowerCase();
  let year = document.getElementById("year").value.toLowerCase();
  let semester = document.getElementById("semester").value.toLowerCase();

  const res = await fetch(
    `http://localhost:5000/api/admin/papers?branch=${encodeURIComponent(branch)}&year=${encodeURIComponent(year)}&semester=${encodeURIComponent(semester)}&type=solution`
  );

  const data = await res.json();

  if (!data || data.length === 0) {
    document.getElementById("result").innerHTML =
      "❌ No Solution Available";
    return;
  }

  window.location.href =
    `http://localhost:5000/api/download/${data[0].fileUrl}`;
}
