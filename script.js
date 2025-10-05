document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();

  addBtn.addEventListener("click", addTask);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });

  function addTask() {
    const text = input.value.trim();
    if (!text) return;

    const task = { text, completed: false };
    tasks.push(task);
    saveAndRender();
    input.value = "";
  }

  function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveAndRender();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveAndRender();
  }

  function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => toggleTask(index));

      const span = document.createElement("span");
      span.textContent = task.text;

      if (task.completed) li.classList.add("completed");

      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑";
      delBtn.classList.add("delete-btn");
      delBtn.addEventListener("click", () => deleteTask(index));

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(delBtn);
      taskList.appendChild(li);
    });
  }
});
