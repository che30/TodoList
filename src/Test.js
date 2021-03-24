
const task = require("./Task.js")

it("creates instance of class",()=>{
  const newTask = new task("abc","abcg","2021-03-19","high","1616531323647","default")
  expect(newTask).toBe(instanceOf(task))
})