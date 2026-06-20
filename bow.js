const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const themeBtn = document.getElementById("themeBtn");

// Load Tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render Tasks
function renderTasks() {
    taskList.innerHTML = tasks
        .map(
            (task, index) => `
        <li>
            ${task}
            <button class="delete-btn" data-index="${index}">
                Delete
            </button>
        </li>
    `
        )
        .join("");
}

// Save to Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add Task
addBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();

    if (!task) return;

    tasks.push(task);
    saveTasks();
    renderTasks();

    taskInput.value = "";
});

// Event Delegation
taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const index = e.target.dataset.index;

        tasks.splice(index, 1);

        saveTasks();
        renderTasks();
    }
});

// Theme Toggle
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const currentTheme =
        document.body.classList.contains("dark")
            ? "dark"
            : "light";

    localStorage.setItem("theme", currentTheme);
});

// Load Theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

// Initial Render
renderTasks();
async function fetchTasks() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos?_limit=5"
        );

        const data = await response.json();

        tasks = data.map(todo => todo.title);

        saveTasks();
        renderTasks();

    } catch (error) {
        console.log(error);
    }
}

fetchTasks();