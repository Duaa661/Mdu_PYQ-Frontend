/* ==============================
   SHOW YEAR
================================= */
function showYear() {
  const branch = document.getElementById("branch").value;
  document.getElementById("yearBox").style.display =
    branch !== "" ? "block" : "none";
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
}

/* ==============================
   SHOW DOWNLOAD (MAIN FILTER)
================================= */
async function showDownload() {
  const branch = document.getElementById("branch").value.toLowerCase();
  const year = document.getElementById("year").value.toLowerCase();
  const semester = document.getElementById("semester").value.toLowerCase();
  const paper = document.getElementById("paper").value.toLowerCase();

  if (!branch || !year || !semester || !paper) return;

  document.getElementById("downloadBox").style.display = "block";
     console.log(branch,year,semester,paper)
  try {
    const res = await fetch(
  `http://localhost:5000/api/admin/papers?branch=${branch.toLowerCase()}&year=${year.toLowerCase()}&semester=${semester.toLowerCase()}&paper=${paper.toLowerCase()}`
);

    const data = await res.json();
    console.log(data)
    console.log(data)
    const paperList = document.getElementById("paperList");
    paperList.innerHTML = "";

    if (!data || data.length === 0) {
      paperList.innerHTML =
        "<p style='color:red;'>❌ Question paper and solution are not uploaded.</p>";
      return;
    }

    data.forEach((item) => {
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
   DIRECT DOWNLOAD
================================= */
function downloadFile(fileName) {
  window.location.href =
    `http://localhost:5000/api/download/${fileName}`;
}

/* ==============================
   DOWNLOAD QUESTION PAPER
================================= */
async function downloadPaper() {
  const branch = document.getElementById("branch").value.toLowerCase();
  const year = document.getElementById("year").value.toLowerCase();
  const semester = document.getElementById("semester").value.toLowerCase();
  const paper = document.getElementById("paper").value.toLowerCase();
  try {
    const res = await fetch(
      `http://localhost:5000/api/admin/papers?branch=${encodeURIComponent(branch)}&year=${encodeURIComponent(year)}&semester=${encodeURIComponent(semester)}&paper=${encodeURIComponent(paper)}&type=question`
    );

    const data = await res.json();

    if (!data || data.length === 0) {
      document.getElementById("result").innerHTML =
        "❌ No Question Paper Available";
      return;
    }

    window.location.href =
      `http://localhost:5000/api/download/${data[0].fileUrl} `;

  } catch (error) {
    console.error("Error:", error);
  }
}

/* ==============================
   DOWNLOAD SOLUTION
================================= */
async function downloadSolution() {
  const branch = document.getElementById("branch").value.toLowerCase();
  const year = document.getElementById("year").value.toLowerCase();
  const semester = document.getElementById("semester").value.toLowerCase();
  const paper = document.getElementById("paper").value.toLowerCase();

  try {
    const res = await fetch(
      `http://localhost:5000/api/admin/papers?branch=${encodeURIComponent(branch)}&year=${encodeURIComponent(year)}&semester=${encodeURIComponent(semester)}&paper=${encodeURIComponent(paper)}&type=solution`
    );

    const data = await res.json();

    if (!data || data.length === 0) {
      document.getElementById("result").innerHTML =
        "❌ No Solution Available";
      return;
    }

    window.location.href =
      `http://localhost:5000/api/download/${data[0].fileUrl}`;

  } catch (error) {
    console.error("Error:", error);
  }
}
