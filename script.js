// ========== DASHBOARD TOGGLING ==========
// button on public hero
const showDashBtn = document.getElementById("show-dashboard-btn");
const dashboardSection = document.getElementById("dashboard");

if (showDashBtn) {
  showDashBtn.addEventListener("click", () => {
    // show the dashboard section
    dashboardSection.classList.remove("hidden");
    // scroll to it
    dashboardSection.scrollIntoView({ behavior: "smooth" });
  });
}

// helper for buttons inside dashboard
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

// ========== HEALTH RECORDS LOGIC ==========
// get form + display container
const healthForm = document.getElementById("health-form");
const recordsDiv = document.getElementById("records");

// load existing on page load
document.addEventListener("DOMContentLoaded", () => {
  loadRecords();
});

// when submit health record
if (healthForm) {
  healthForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const vaccine = document.getElementById("vaccine").value;
    const date = document.getElementById("date").value;
    const notes = document.getElementById("notes").value;

    const record = { vaccine, date, notes };

    // get existing records from localStorage
    let records = JSON.parse(localStorage.getItem("dogRecords")) || [];
    records.push(record);

    // save back
    localStorage.setItem("dogRecords", JSON.stringify(records));

    // reset form
    healthForm.reset();

    // refresh UI
    displayRecords(records);
  });
}

// load records from localStorage
function loadRecords() {
  const records = JSON.parse(localStorage.getItem("dogRecords")) || [];
  displayRecords(records);
}

// render records
function displayRecords(records) {
  if (!recordsDiv) return;
  recordsDiv.innerHTML = "";

  records.forEach((rec, index) => {
    const div = document.createElement("div");
    div.classList.add("record-card");
    div.innerHTML = `
      <h3>${rec.vaccine}</h3>
      <p><strong>Date:</strong> ${rec.date}</p>
      <p><strong>Notes:</strong> ${rec.notes || "None"}</p>
      <div class="record-actions">
        <button onclick="editRecord(${index})" class="btn ghost small">Edit</button>
        <button onclick="deleteRecord(${index})" class="btn ghost small">Delete</button>
      </div>
    `;
    recordsDiv.appendChild(div);
  });
}

// delete record
function deleteRecord(index) {
  let records = JSON.parse(localStorage.getItem("dogRecords")) || [];
  records.splice(index, 1);
  localStorage.setItem("dogRecords", JSON.stringify(records));
  displayRecords(records);
}

// edit record -> put values back into form, remove old one
function editRecord(index) {
  let records = JSON.parse(localStorage.getItem("dogRecords")) || [];
  const rec = records[index];

  // fill form
  document.getElementById("vaccine").value = rec.vaccine;
  document.getElementById("date").value = rec.date;
  document.getElementById("notes").value = rec.notes || "";

  // remove old record
  records.splice(index, 1);
  localStorage.setItem("dogRecords", JSON.stringify(records));
  displayRecords(records);

  // scroll to form
  const recordsSection = document.getElementById("records");
  if (recordsSection) {
    recordsSection.scrollIntoView({ behavior: "smooth" });
  }
}
