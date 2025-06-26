document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");
  const taskMessage = document.getElementById("task-message");
  const clearAllBtn = document.getElementById("clear-all");
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTask(task));

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    todoInput.value = "";
    showMessage("Task added!");
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add("delete-btn");

    // Toggle complete
    span.addEventListener("click", () => {
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    // Delete task
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
      showMessage("Task deleted!");
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function showMessage(text) {
    taskMessage.textContent = text;
    taskMessage.style.display = "block";
    setTimeout(() => {
      taskMessage.style.display = "none";
    }, 2000);
  }

  // Clear all
  clearAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
      tasks = [];
      todoList.innerHTML = "";
      saveTasks();
      showMessage("All tasks cleared!");
    }
  });

  // Theme toggle
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light");
    const isLight = body.classList.contains("light");
    themeToggle.textContent = isLight ? "🌙 Dark Mode" : "☀️ Light Mode";
  });
});
