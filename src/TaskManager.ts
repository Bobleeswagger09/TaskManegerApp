// TaskManager.ts
import { Task } from "./Task";

export class TaskManager {
  private tasks: Task[] = [];

  addTask(task: Task): void {
    this.tasks.push(task);
    this.saveToLocalStorage();
  }

  deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.getTaskInfo().id !== taskId);
    this.saveToLocalStorage();
  }

  markTaskAsCompleted(taskId: string): void {
    const task = this.tasks.find((task) => task.getTaskInfo().id === taskId);
    if (task) {
      task.markAsCompleted();
      this.saveToLocalStorage();
    }
  }

  markTaskAsNotCompleted(taskId: string): void {
    const task = this.tasks.find((task) => task.getTaskInfo().id === taskId);
    if (task) {
      task.markAsNotCompleted();
      this.saveToLocalStorage();
    }
  }

  toggleTaskCompletion(taskId: string): void {
    const task = this.tasks.find((task) => task.getTaskInfo().id === taskId);
    if (task) {
      task.toggleCompletion();
      this.saveToLocalStorage();
    }
  }

  editTask(
    taskId: string,
    title: string,
    description: string,
    priority: "Low" | "Medium" | "High"
  ): void {
    const task = this.tasks.find((task) => task.getTaskInfo().id === taskId);
    if (task) {
      task.updateTask(title, description, priority);
      this.saveToLocalStorage();
    }
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  saveToLocalStorage(): void {
    localStorage.setItem(
      "tasks",
      JSON.stringify(this.tasks.map((task) => task.getTaskInfo()))
    );
  }

  loadFromLocalStorage(): void {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    this.tasks = storedTasks.map(
      (task: any) => new Task(task.title, task.description, task.priority)
    );
  }
}
