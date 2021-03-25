
import Task from './Task';

test('creates instance of class', () => {
  const newTask = new Task('abc', 'abcg', '2021-03-19', 'high', '1616531323647', 'default');
  expect(newTask).toBeInstanceOf(Task);
});
test('constructor does not throw error when called without parameters', () => {
  const newTask = new Task();
  expect(() => newTask).not.toThrow();
});
test('constructor throws error when called with invalid parameters', () => {
  const taskOne = new Task('a', 'ab', 'c', 'd', 'e', 'f');
  Task.storeTask(taskOne);
  const getTaskone = Task.getTask();
  expect(getTaskone[0].title).toBe('a');
});
test('creates instance of an array class', () => {
  expect(Task.getTask()).toBeInstanceOf(Array);
});
test('throws an error if the storeTask method is called without argument', () => {
  const store = Task.storeTask();
  expect(store).toBe(undefined);
});