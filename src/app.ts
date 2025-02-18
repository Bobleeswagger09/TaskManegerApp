// app.ts
import { Task } from "./Task";
import { TaskManager } from "./TaskManager";

const taskManager = new TaskManager();
taskManager.loadFromLocalStorage();

const taskForm = document.getElementById("taskForm") as HTMLFormElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;
let editingTaskId: string | null = null;

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = (document.getElementById("title") as HTMLInputElement).value;
  const description = (
    document.getElementById("description") as HTMLInputElement
  ).value;
  const priority = (document.getElementById("priority") as HTMLSelectElement)
    .value as "Low" | "Medium" | "High";

  if (editingTaskId) {
    taskManager.editTask(editingTaskId, title, description, priority);
    editingTaskId = null;
  } else {
    const newTask = new Task(title, description, priority);
    taskManager.addTask(newTask);
  }

  renderTasks();
  taskForm.reset();
});

function renderTasks(): void {
  taskList.innerHTML = "";
  taskManager.getTasks().forEach((task) => {
    const li = document.createElement("li");

    // Set the task's priority color
    const taskPriority = task.getTaskInfo().priority;
    li.classList.add(taskPriority.toLowerCase());

    // Create task title and description
    const taskText = document.createElement("span");
    taskText.textContent = `${task.getTaskInfo().title} - ${
      task.getTaskInfo().priority
    }`;
    taskText.classList.add("task-text");
    if (task.getTaskInfo().completed) {
      taskText.classList.add("completed");
    }
    li.appendChild(taskText);

    // Checkbox to mark task as completed
    const completionCheckbox = document.createElement("input");
    completionCheckbox.type = "checkbox";
    completionCheckbox.checked = task.getTaskInfo().completed;
    completionCheckbox.onclick = () => {
      taskManager.toggleTaskCompletion(task.getTaskInfo().id);
      renderTasks();
    };
    li.appendChild(completionCheckbox);

    // Edit button to edit the task
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      const taskInfo = task.getTaskInfo();
      (document.getElementById("title") as HTMLInputElement).value =
        taskInfo.title;
      (document.getElementById("description") as HTMLInputElement).value =
        taskInfo.description;
      (document.getElementById("priority") as HTMLSelectElement).value =
        taskInfo.priority;
      editingTaskId = taskInfo.id;
    };
    li.appendChild(editBtn);

    // Delete button to delete the task
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => {
      taskManager.deleteTask(task.getTaskInfo().id);
      renderTasks();
    };
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

renderTasks();
