import Project from './Project';
import UI from './UI';

test('creates instance of class', () => {
  const project = new Project('abc', 1);
  expect(project).toBeInstanceOf(Project);
});
test('constructor does not throw error when called without parameters', () => {
  const project = new Project();
  expect(() => project).not.toThrow();
});
test('constructor does not throw error when called without parameters', () => {
  const projectOne = new Project('one', 1);
  UI.storeProjectName(projectOne);
  const getProjectOne = UI.getProjectName();
  expect(getProjectOne[0].name).toBe('one');
});
test('constructor does not throw error when called without parameters', () => {
  expect(() => new Project('a', 1, 1)).not.toThrow();
});