class Note {
  public readonly createdAt: Date = new Date();
  public updatedAt: Date;

  constructor(public title: string, public content: string, public status: "active" | "completed") {
    if (!title.trim() || !content.trim()) throw new Error("Title and content cannot be empty");

    this.updatedAt = new Date();
  }

  edit(newContent: string) {
    if (!newContent.trim()) throw new Error("Content cannot be empty");
    this.content = newContent;
    this.updatedAt = new Date();
  }

  markAsCompleted() {
    this.status = "completed";
    this.updatedAt = new Date();
  }
}

class ImportantNote extends Note {
  constructor(title: string, content: string, status: "active" | "completed") {
    super(title, content, status);
  }

  edit(newContent: string) {
    if (!confirm(`Are you sure you want to edit the note "${this.title}"?`)) return;
    super.edit(newContent);
  }

  delete(): boolean {
    return confirm(`Are you sure you want to delete the note "${this.title}"?`);
  }
}

class TodoList {
  private notes: Note[] = [];

  add(note: Note) {
    this.notes.push(note);
    console.log(`Note "${note.title}" added.`);
  }

  delete(index: number) {
    if (index < 0 || index >= this.notes.length) throw new Error("Invalid note index");

    const note = this.notes[index];
    if (note instanceof ImportantNote && !(note as ImportantNote).delete()) return;

    this.notes.splice(index, 1);
    console.log(`Note "${note.title}" deleted.`);
  }

  edit(index: number, newContent: string) {
    if (index < 0 || index >= this.notes.length) throw new Error("Invalid note index");

    this.notes[index].edit(newContent);
    console.log(`Note "${this.notes[index].title}" edited.`);
  }

  markAsCompleted(index: number) {
    if (index < 0 || index >= this.notes.length) throw new Error("Invalid note index");

    this.notes[index].markAsCompleted();
    console.log(`Note "${this.notes[index].title}" marked as completed.`);
  }

  getNoteInfo(index: number) {
    if (index < 0 || index >= this.notes.length) throw new Error("Invalid note index");

    const note = this.notes[index];
    return `Title: ${note.title}\nContent: ${note.content}\nStatus: ${note.status}\nCreated: ${note.createdAt.toLocaleString()}\nUpdated: ${note.updatedAt.toLocaleString()}`;
  }

  list() {
    console.log("Notes list:");
    this.notes.forEach((note, i) => {
      console.log(
        `${i + 1}. ${note.title} [${note.status}] - Created: ${note.createdAt.toLocaleString()}, Updated: ${note.updatedAt.toLocaleString()}`
      );
    });
  }

  count() {
    const total = this.notes.length;
    const remaining = this.notes.filter((note) => note.status === "active").length;
    return `Total notes: ${total}, Uncompleted: ${remaining}`;
  }

  search(query: string) {
    return this.notes.filter((note) => note.title.includes(query) || note.content.includes(query));
  }

  sort(by: "status" | "date") {
    if (by === "status") {
      this.notes.sort((a, b) => a.status.localeCompare(b.status));
    } else if (by === "date") {
      this.notes.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
  }
}

// Example usage
const myTodo = new TodoList();

const note1 = new Note("Buy shoose", "Don't forget to buy", "active");
const note2 = new ImportantNote("Important call", "Call mother", "active");

myTodo.add(note1);
myTodo.add(note2);
myTodo.list();

myTodo.edit(0, "Buy milk and bread");
myTodo.markAsCompleted(0);

console.log(myTodo.getNoteInfo(0));

myTodo.delete(1);
myTodo.list();

console.log(myTodo.count());

console.log("Search results:", myTodo.search("milk"));

myTodo.sort("status");
myTodo.list();
