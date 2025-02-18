export class Task {
  private id: string;
  private completed: boolean = false;

  constructor(
    public title: string,
    public description: string,
    public priority: "Low" | "Medium" | "High"
  ) {
    this.id = Date.now().toString();
  }

  markAsCompleted(): void {
    this.completed = true;
  }

  markAsNotCompleted(): void {
    this.completed = false;
  }

  toggleCompletion(): void {
    this.completed = !this.completed;
  }

  getTaskInfo() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      priority: this.priority,
      completed: this.completed,
    };
  }

  updateTask(
    title: string,
    description: string,
    priority: "Low" | "Medium" | "High"
  ): void {
    this.title = title;
    this.description = description;
    this.priority = priority;
  }
}
