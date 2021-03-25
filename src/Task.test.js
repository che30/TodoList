
import Task from "./Task.js"

test("creates instance of class",()=>{
  const newTask = new Task("abc","abcg","2021-03-19","high","1616531323647","default")
  expect(newTask).toBeInstanceOf(Task)
})
test("constructor does not throw error when called without parameters",()=>{
  const newTask = new Task()
  expect(()=>newTask).not.toThrow()
})
test("constructor throws error when called with invalid parameters",()=>{
  expect(()=>new Task(a,"ab","c","d","e","f")).toThrow()
})
test("creates instance of an array class",()=>{
 expect(Task.getTask()).toBeInstanceOf(Array)

})
test("throws an error if the storeTask method is called without argument",()=>{
  expect(()=>{Task.storeTask(b)}).toThrow()
 
 })