// contract/assembly/model.ts
import { PersistentUnorderedMap, math } from "near-sdk-as";

export const todos = new PersistentUnorderedMap<u32, Todo>("todos");

@nearBindgen
export class PartialTodo {
  task: string;
  priority: string;
  done: bool;
}

@nearBindgen
export class Todo {
  id: u32;
  task: string;
  priority: string;
  done: bool;

  constructor(task: string, priority: string) {
    this.id = math.hash32<string>(task);
    this.task = task;
    this.priority = priority;
    this.done = false;
  }

  static insert(task: string, priority: string): Todo {
    // create a new Todo
    const todo = new Todo(task, priority);

    // add the todo to the PersistentUnorderedMap
    // where the key is the todo's id and the value
    // is the todo itself. Think of this like an
    // INSERT statement in SQL.
    todos.set(todo.id, todo);

    return todo;
  }

  static findById(id: u32): Todo {
    // Lookup a todo in the PersistentUnorderedMap by its id.
    // This is like a SELECT * FROM todos WHERE id=?
    return todos.getSome(id);
  }

  static find(): Todo[] {
    return todos.values();
  }

  static findByIdAndUpdate(id: u32, partial: PartialTodo): Todo {
    // find a todo by its id
    const todo = this.findById(id);

    // update the todo in-memory
    todo.task = partial.task;
    todo.done = partial.done;

    // persist the updated todo
    todos.set(id, todo);

    return todo;
  }

  static findByIdAndDelete(id: u32): void {
    todos.delete(id);
  }

}
