import Project from "./Project"

test("creates instance of class",()=>{
  const project = new Project("abc",1)
  expect(project).toBeInstanceOf(Project)
})
test("constructor does not throw error when called without parameters",()=>{
  const project = new Project()
  expect(()=>project).not.toThrow()
})
test("constructor does not throw error when called without parameters",()=>{
  expect(()=>new Project(a,1)).toThrow()
})
test("constructor does not throw error when called without parameters",()=>{
  expect(()=>new Project(a,1,1)).toThrow()
})