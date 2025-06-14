// Load existing skills from localStorage or initialize with empty array
let skills = JSON.parse(localStorage.getItem("skillsData")) || [];

// Save current skills array to localStorage
function saveSkillsToLocalStorage() {
  localStorage.setItem("skillsData", JSON.stringify(skills));
}

// Render all skill boxes on the page
function renderSkills() {
  const container = document.getElementById("skills-container");
  container.innerHTML = ""; // Clear container before re-rendering
  skills.forEach((skill, index) => createSkillBox(skill, index)); // Create each skill box
}

// Create a visual skill box with title, subskills, progress bar, and delete functionality
function createSkillBox(skillData, skillIndex) {
  const skillBox = document.createElement("div");
  skillBox.className = "skill-box";

  // --- Skill title and delete button row ---
  const headerRow = document.createElement("div");
  headerRow.style.display = "flex";
  headerRow.style.justifyContent = "space-between";
  headerRow.style.alignItems = "center";

  const skillTitle = document.createElement("h3");
  skillTitle.textContent = skillData.name;
  headerRow.appendChild(skillTitle);

  // Delete entire skill button
  const deleteSkillBtn = document.createElement("button");
  deleteSkillBtn.textContent = "Delete Skill";
  deleteSkillBtn.className = "delete-btn";
  deleteSkillBtn.onclick = () => {
    skills.splice(skillIndex, 1); // Remove skill from array
    saveSkillsToLocalStorage();
    renderSkills(); // Re-render all skills
  };
  headerRow.appendChild(deleteSkillBtn);
  skillBox.appendChild(headerRow);

  // --- Subskill Container ---
  const subskillContainer = document.createElement("div");
  subskillContainer.className = "subskill-container";
  skillBox.appendChild(subskillContainer);

  // --- Subskill Input Row ---
  const subskillInputRow = document.createElement("div");
  subskillInputRow.className = "subskill-input-row";

  const subskillInput = document.createElement("input");
  subskillInput.type = "text";
  subskillInput.placeholder = "Enter subskill";
  subskillInput.className = "subskill-input";
  subskillInputRow.appendChild(subskillInput);

  // Add Subskill button
  const addSubskillBtn = document.createElement("button");
  addSubskillBtn.textContent = "Add Subskill";
  addSubskillBtn.className = "add-subskill-btn";
  subskillInputRow.appendChild(addSubskillBtn);

  skillBox.appendChild(subskillInputRow);

  // --- Progress Bar ---
  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";

  const progressBarFill = document.createElement("div");
  progressBarFill.className = "progress-bar-fill";
  progressBar.appendChild(progressBarFill);
  skillBox.appendChild(progressBar);

  // --- Stats Box (shows completed/total) ---
  const statsBox = document.createElement("div");
  statsBox.className = "stats-box";
  skillBox.appendChild(statsBox);

  // Function to update progress bar and stats
  const updateProgress = () => {
    const checkboxes = subskillContainer.querySelectorAll("input[type='checkbox']");
    const checked = subskillContainer.querySelectorAll("input[type='checkbox']:checked");
    const total = checkboxes.length;
    const completed = checked.length;

    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    progressBarFill.style.width = percent + "%";
    statsBox.textContent = `${completed}/${total} Subskills Completed`;
  };

  // Render each subskill (with checkbox and delete)
  skillData.subskills.forEach((sub, subIndex) => {
    const subskill = document.createElement("div");
    subskill.className = "subskill";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "circle-checkbox";
    checkbox.checked = sub.completed;
    checkbox.onchange = () => {
      sub.completed = checkbox.checked; // Update completion
      updateProgress();
      saveSkillsToLocalStorage();
    };

    const label = document.createElement("label");
    label.textContent = sub.name;

    // Delete button for subskill
    const deleteSubskillBtn = document.createElement("button");
    deleteSubskillBtn.textContent = "✕";
    deleteSubskillBtn.className = "delete-btn";
    deleteSubskillBtn.style.padding = "4px 10px";
    deleteSubskillBtn.onclick = () => {
      skillData.subskills.splice(subIndex, 1); // Remove subskill
      saveSkillsToLocalStorage();
      renderSkills();
    };

    subskill.appendChild(checkbox);
    subskill.appendChild(label);
    subskill.appendChild(deleteSubskillBtn);
    subskillContainer.appendChild(subskill);
  });

  // On clicking Add Subskill
  addSubskillBtn.onclick = () => {
    const subskillText = subskillInput.value.trim();
    if (!subskillText) return;

    const newSubskill = {
      name: subskillText,
      completed: false
    };
    skillData.subskills.push(newSubskill); // Add to array
    saveSkillsToLocalStorage();
    renderSkills();
  };

  // Initial progress update
  updateProgress();

  // Add fully built skillBox to the DOM
  document.getElementById("skills-container").appendChild(skillBox);
}

// Prompt user for skill name and add a new skill
function addSkill() {
  const name = prompt("Enter the skill name:");
  if (!name) return;

  const newSkill = {
    name: name,
    subskills: []
  };

  skills.push(newSkill);
  saveSkillsToLocalStorage();
  renderSkills();
}

// Call renderSkills on page load to show existing data
window.onload = renderSkills;
