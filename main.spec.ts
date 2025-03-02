import { describe, expect, test, jest, beforeEach } from '@jest/globals';
import { Note, SpecificNote, TodoList } from './main';

describe('Note', () => {
  test('should create a note successfully', () => {
    const note = new Note('Title', 'Content', 'active');
    expect(note.title).toBe('Title');
    expect(note.content).toBe('Content');
    expect(note.status).toBe('active');
  });

  test('should not create a note with empty title or content', () => {
    expect(() => new Note('', 'Content', 'active')).toThrow('Title and content cannot be empty');
    expect(() => new Note('Title', '', 'active')).toThrow('Title and content cannot be empty');
  });

  test('should edit note content', () => {
    const note = new Note('Title', 'Content', 'active');
    note.edit('New Content');
    expect(note.content).toBe('New Content');
  });

  test('should mark note as completed', () => {
    const note = new Note('Title', 'Content', 'active');
    note.markAsCompleted();
    expect(note.status).toBe('completed');
  });
});

describe('SpecificNote', () => {
  test('should confirm before editing', () => {
    global.confirm = jest.fn(() => true);
    const note = new SpecificNote('Title', 'Content', 'active');
    note.edit('Updated Content');
    expect(note.content).toBe('Updated Content');
  });

  test('should confirm before deleting', () => {
    global.confirm = jest.fn(() => false);
    const note = new SpecificNote('Title', 'Content', 'active');
    expect(note.delete()).toBe(false);
  });
});

describe('TodoList', () => {
  let todoList;
  let note;
  let specificNote;

  beforeEach(() => {
    todoList = new TodoList();
    note = new Note('Buy groceries', 'Milk and eggs', 'active');
    specificNote = new SpecificNote('Call mom', 'Call at 7 PM', 'active');
  });

  test('should add a note', () => {
    todoList.add(note);
    expect(todoList.count()).toBe('Total notes: 1, Uncompleted: 1');
  });

  test('should delete a note', () => {
    todoList.add(note);
    todoList.delete(0);
    expect(todoList.count()).toBe('Total notes: 0, Uncompleted: 0');
  });

  test('should edit a note', () => {
    todoList.add(note);
    todoList.edit(0, 'Buy milk, eggs, and bread');
    expect(todoList.getNoteInfo(0)).toContain('Buy milk, eggs, and bread');
  });

  test('should mark a note as completed', () => {
    todoList.add(note);
    todoList.markAsCompleted(0);
    expect(todoList.getNoteInfo(0)).toContain('Status: completed');
  });

  test('should search notes', () => {
    todoList.add(note);
    expect(todoList.search('Milk').length).toBe(1);
  });

  test('should sort notes by status', () => {
    const completedNote = new Note('Completed Task', 'Done', 'completed');
    todoList.add(note);
    todoList.add(completedNote);
    todoList.sort('status');
    expect(todoList.getNoteInfo(0)).toContain('Completed Task');
  });
});
