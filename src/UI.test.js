import UI from './UI.js'
test("creates instance of class UI",()=>{
  const ui= new UI()
  expect(()=>ui).not.toThrow()
})
test("throws error if we try to instantiate UI class",()=>{
  expect(()=>new UI(a)).toThrow()
})
test("creates instance of an array class",()=>{
  expect(UI.getSelected()).toBeInstanceOf(Array)
 
 })
 test("the selected project should be array of length one",()=>{
  expect(UI.getSelected().length).toEqual(1)
 
 })
 test("creates instance of an UI class",()=>{
  expect(UI.getProjectName()).toBeInstanceOf(Array)
 
 })
 test("creates instance of an UI class",()=>{
  expect(()=>UI.getProjectName(a)).toThrow()
 
 })