/* ==============================
   SHOW YEAR
================================= */
function showYear() {
  const branch = document.getElementById("branch").value;
  document.getElementById("yearBox").style.display =
    branch !== "" ? "block" : "none";
  resetDownload();
}

/* ==============================
   SHOW SEMESTER
================================= */
function showSemester() {
  const year = document.getElementById("year").value;
  const semBox = document.getElementById("semBox");
  const semesterSelect = document.getElementById("semester");

  semesterSelect.innerHTML =
    "<option value=''>-- Choose Semester --</option>";

  const semesterMap = {
    "1st": ["1st Sem", "2nd Sem"],
    "2nd": ["3rd Sem", "4th Sem"],
    "3rd": ["5th Sem", "6th Sem"],
    "4th": ["7th Sem", "8th Sem"],
  };

  if (semesterMap[year]) {
    semesterMap[year].forEach((sem) => {
      const option = document.createElement("option");
      option.value = sem;
      option.text = sem;
      semesterSelect.add(option);
    });
  }

  semBox.style.display = year !== "" ? "block" : "none";
  resetDownload();
}

/* ==============================
   SHOW PAPER
================================= */
function showpaper() {
  const semester = document.getElementById("semester").value;
  const paperBox = document.getElementById("paperBox");
  const paperSelect = document.getElementById("paper");

  paperSelect.innerHTML =
    "<option value=''>-- Choose Paper --</option>";

  const paperMap = {
    "1st Sem": ["C-Programming", "Chemistry", "Mechanical", "Engineering-Mathematics"],
    "2nd Sem": ["Physics", "Electrical-Engineering", "Engineering-Mathematics"],
    "3rd Sem": ["DBMS", "DSA", "Python", "Digital-Electronics", "Mathematics-3", "Economics"],
    "4th Sem": ["Discrete-Mathematics", "COA", "Operating-System", "OOPS", "Organizational-Behaviour", "Environmental-Science"],
    "5th Sem": ["Computer-Network", "Software-Engineering", "Theory-of-Computation", "Design-Analysis-Algorithm", "Java", "MicroProcessor"],
    "6th Sem": ["MCW", "MAD", "Advance-Java", "AI", "Compiler-Design", "Data-Science", "Open-Elective-1"],
    "7th Sem": ["Neural-Network", "Professional-Elective-4", "Professional-Elective-3"],
    "8th Sem": ["Machine-Learning", "Big-Analytics", "Open-Elective-2"],
  };

  if (paperMap[semester]) {
    paperMap[semester].forEach((paper) => {
      const option = document.createElement("option");
      option.value = paper;
      option.text = paper;
      paperSelect.add(option);
    });
  }

  paperBox.style.display = semester !== "" ? "block" : "none";
  resetDownload();
}

/* ==============================
   SHOW SON
================================= */
function showSon() {
  const paper = document.getElementById("paper").value;
  document.getElementById("SonBox").style.display =
    paper !== "" ? "block" : "none";
  resetDownload();
}
/* ==============================
   RESET DOWNLOAD AREA (CLEAR ONLY)
================================= */
function resetDownload() {
  const downloadBox = document.getElementById("downloadBox");
  const paperList = document.getElementById("paperList");
  const result = document.getElementById("result");

  paperList.innerHTML = "";
  result.innerHTML = "";
  downloadBox.style.display = "none"; // hide until ready
}

/* ==============================
   SHOW ERROR IF ANY FIELD MISSING
================================= */
function checkAndShowError() {
  const downloadBox = document.getElementById("downloadBox");
  const result = document.getElementById("result");

  const branch = document.getElementById("branch").value;
  const year = document.getElementById("year").value;
  const semester = document.getElementById("semester").value;
  const paper = document.getElementById("paper").value;
  const son = document.getElementById("son").value;

  if (!branch || !year || !semester || !paper || !son) {
    downloadBox.style.display = "block";
    result.innerHTML = "❌ Please select all filters to see available papers.";
    return true;
  }
  return false;
}

/* ==============================
   SHOW DOWNLOAD (MAIN FILTER)
================================= */
async function showDownload() {
  if (checkAndShowError()) return;

  const branch = document.getElementById("branch").value.toLowerCase();
  const year = document.getElementById("year").value.toLowerCase();
  const semester = document.getElementById("semester").value.toLowerCase();
  const paper = document.getElementById("paper").value.toLowerCase();
  const son = document.getElementById("son").value.toLowerCase();

  const downloadBox = document.getElementById("downloadBox");
  downloadBox.style.display = "block";

  try {
    const res = await fetch(
      `http://localhost:5000/api/admin/papers?branch=${encodeURIComponent(branch)}&year=${encodeURIComponent(year)}&semester=${encodeURIComponent(semester)}&paper=${encodeURIComponent(paper)}&son=${encodeURIComponent(son)}`
    );

    const data = await res.json();
    const paperList = document.getElementById("paperList");
    paperList.innerHTML = "";

    if (!data.papers || data.papers.length === 0) {
      paperList.innerHTML =
        "<p style='color:red;'>❌ This question paper and solution are not available at this time.</p>";
      return;
    }

    data.papers.forEach((item) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>${item.type.toUpperCase()}</strong></p>
        <button onclick="downloadFile('${item.fileUrl}')">
          Download ${item.type} paper
        </button>
        <hr/>
      `;
      paperList.appendChild(div);
    });

  } catch (error) {
    console.error("Error fetching papers:", error);
  }
}
/* ==============================
   EVENT LISTENERS
================================= */
document.querySelectorAll("#branch, #year, #semester, #paper, #son")
  .forEach(el => el.addEventListener("change", () => {
    resetDownload(); // always clear previous
    // only show error if user interacted with all fields and something is missing
    const branch = document.getElementById("branch").value;
    const year = document.getElementById("year").value;
    const semester = document.getElementById("semester").value;
    const paper = document.getElementById("paper").value;
    const son = document.getElementById("son").value;

    if (branch && year && semester && paper && son) {
      showDownload(); // fetch papers
    }
  }));

/* ==============================
   DIRECT DOWNLOAD
================================= */
async function downloadFile(fileUrl) {
  const res = await fetch(
    `http://localhost:5000/api/download?fileUrl=${encodeURIComponent(fileUrl)}`
  );

  const data = await res.json();

  window.location.href = data.url;
}
/* ==============================
   BACK BUTTON
================================= */
function goBack() {
  window.location.href = "index.html"; // change to your previous page
}

/* ==============================
   EVENT LISTENERS TO UPDATE DOWNLOAD
================================= */
document.querySelectorAll("#branch, #year, #semester, #paper, #son")
  .forEach(el => el.addEventListener("change", () => {
    resetDownload();
    const branch = document.getElementById("branch").value;
    const year = document.getElementById("year").value;
    const semester = document.getElementById("semester").value;
    const paper = document.getElementById("paper").value;
    const son = document.getElementById("son").value;

    if (branch && year && semester && paper && son) {
      showDownload();
    }
  }));
