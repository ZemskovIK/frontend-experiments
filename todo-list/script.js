document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addBtn = document.getElementById('addBtn');
  const taskList = document.getElementById('taskList');
  const taskCount = document.getElementById('taskCount');
  const clearAll = document.getElementById('clearAll');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const taskItem = document.createElement('li');
      taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
      taskItem.innerHTML = `
        <button class="complete-btn" aria-label="${task.completed ? 'Снять отметку' : 'Отметить выполненным'}">
          <i class="far fa-${task.completed ? 'check-circle' : 'circle'}"></i>
        </button>
        <span class="task-text">${task.text}</span>
        <div class="task-actions">
          <button class="delete-btn" aria-label="Удалить задачу">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
      taskList.appendChild(taskItem);

      taskItem.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(index));
      taskItem.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));
    });

    updateTaskCount();
  }

  function addTask() {
    const text = taskInput.value.trim();
    if (text) {
      tasks.push({ text, completed: false });
      saveTasks();
      taskInput.value = '';
      renderTasks();

      setTimeout(() => {
        taskList.scrollTo({
          top: taskList.scrollHeight,
          behavior: 'smooth'
        });
      }, 50);
    }
  }

  function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  function updateTaskCount() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    taskCount.textContent = `${completed} из ${total} выполнено`;
  }

  function clearAllTasks() {
    if (confirm('Вы уверены, что хотите удалить все задачи?')) {
      tasks = [];
      saveTasks();
      renderTasks();
    }
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  addBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });
  clearAll.addEventListener('click', clearAllTasks);

  renderTasks();
});