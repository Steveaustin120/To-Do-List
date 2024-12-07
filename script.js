document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#todoForm");
  const newTask = document.querySelector("#newTask");
  const submit = document.querySelector("#submit");
  const taskList = document.querySelector("#taskList");
  const dueDate = document.querySelector("#dueDate");
  const calendar = document.querySelector("#calendar");

  const tasks = [];

  // Enable/Disable Submit Button
  newTask.addEventListener("input", () => {
    submit.disabled = !newTask.value.trim();
  });

  // Handle Task Submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = newTask.value.trim();
    const priority = document.querySelector("#priority").value;
    const date = dueDate.value;

    if (task && date) {
      tasks.push({ task, priority, date });
      addTaskToList(task, priority, date);
      renderCalendar();
      form.reset();
      submit.disabled = true;
    }
  });

  // Add Task to List
  function addTaskToList(task, priority, date) {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="task-name">${task}</span>
      <span class="task-priority" data-priority="${priority}">${priority}</span>
      <span class="task-date">${date}</span>
      <button class="mark-done">Done</button>
      <button class="delete-task">Delete</button>
    `;

    taskList.appendChild(li);

    // Mark Task as Done
    li.querySelector(".mark-done").addEventListener("click", () => {
      li.classList.toggle("done");
    });

    // Delete Task
    li.querySelector(".delete-task").addEventListener("click", () => {
      const index = tasks.findIndex((t) => t.task === task && t.date === date);
      tasks.splice(index, 1);
      li.remove();
      renderCalendar();
    });
  }

  // Render Calendar View
  function renderCalendar() {
    calendar.innerHTML = "";
    const dates = [...new Set(tasks.map((task) => task.date))];
    dates.sort();

    dates.forEach((date) => {
      const dayTasks = tasks.filter((task) => task.date === date);

      const dateDiv = document.createElement("div");
      dateDiv.className = "calendar-date";
      dateDiv.innerHTML = `
        <strong>${date}</strong>
        <ul>
          ${dayTasks
            .map((task) => `<li>${task.task} (${task.priority})</li>`)
            .join("")}
        </ul>
      `;
      calendar.appendChild(dateDiv);
    });
  }

  // Clear All Tasks
  document.querySelector("#clearTasks").addEventListener("click", () => {
    tasks.length = 0;
    taskList.innerHTML = "";
    renderCalendar();
  });
});
