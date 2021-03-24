
import Task from "./Task.js"

test("creates instance of class",()=>{
  const newTask = new Task("abc","abcg","2021-03-19","high","1616531323647","default")
  expect(newTask).toBeInstanceOf(Task)
})