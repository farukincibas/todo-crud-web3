// contract/assembly/index.ts
import { Todo, PartialTodo } from "./model";

// export the create method. This acts like an endpoint
// that we'll be able to call from our web app.
export function create(task: string, priority: string): Todo {
  // use the Todo class to persist the todo data
  return Todo.insert(task, priority);
}

export function getById(id: u32): Todo {
  return Todo.findById(id);
}

export function get(): Todo[] {
  return Todo.find();
}

export function update(id: u32, updates: PartialTodo): Todo {
  return Todo.findByIdAndUpdate(id, updates);
}

export function del(id: u32): void {
  Todo.findByIdAndDelete(id);
}
