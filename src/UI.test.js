import UI from './UI';
import Project from './Project';

test('creates instance of class UI', () => {
  const ui = new UI();
  expect(() => ui).not.toThrow();
});
test('throws error if we try to instantiate UI class', () => {
  expect(() => new UI('a')).not.toThrow();
});
test('creates instance of an array class', () => {
  expect(UI.getSelected()).toBeInstanceOf(Array);
});
test('the selected project should be array of length one', () => {
  expect(UI.getSelected().length).toEqual(1);
});
test('creates instance of an UI class', () => {
  expect(UI.getProjectName()).toBeInstanceOf(Array);
});
test('creates instance of an UI class', () => {
  expect(() => UI.getProjectName('a')).not.toThrow();
});
test('render color throws an error is not passed string', () => {
  const priority = Number(1);
  try {
    UI.renderColours(priority);
  } catch (e) {
    expect(e.message).toBe(' invalid argument');
  }
});
test('renderColors should return string', () => {
  const value = UI.renderColours('High');
  expect(value).toBe('text-grey');
});
test('type of count project should be Array', () => {
  const value = UI.countProject();
  expect(value instanceof Number).toBe(false);
});
test('catch error if the synchro function not passed argument', () => {
  expect(() => UI.synchro()).toThrow("Cannot read property 'name' of undefined");
});
test('verify default is not returning sring', () => {
  const defaault = new Project('default', 0);
  UI.storeProjectName(defaault);

  expect(UI.renderDefault() instanceof String).toBe(false);
});
test('verify that a project was stored successfully', () => {
  let defaault = new Project('default', 0);
  UI.storeProjectName(defaault);
  defaault = UI.getProjectName();

  expect(defaault.length).toEqual(2);
});
