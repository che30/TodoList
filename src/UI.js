import Project from './Project'
import Task from './Task'
export default class UI {
  static delay(){
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
  static getProjectName() {
    let projects;
    if (localStorage.getItem('projects') === null) {
      projects = [];
    } else {
      projects = JSON.parse(localStorage.getItem('projects'));
    }
    return projects;
  }
  static getSelected() {
    let selectedId;
    if (localStorage.getItem('selectedId') === null) {
      selectedId = [];
    } else {
      selectedId = JSON.parse(localStorage.getItem('selectedId'));
    }
    return selectedId;
  }
  static storeSelected(element) {
    let selectedId = UI.getSelected();
    while( selectedId.length > 0) {
       selectedId.pop();
  }
    selectedId.push(element)
    localStorage.setItem('selectedId', JSON.stringify(selectedId));
  }
  static storeProjectName(project) {
    const projects = UI.getProjectName();
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
  }
  static countProject() {
    let currentNumber = Number(localStorage.getItem('lastProjectId'));
    if (currentNumber === null) {
      currentNumber = 1;
    } else {
      currentNumber += 1;
      localStorage.setItem('lastProjectId', currentNumber);
    }
    return currentNumber;
  }
  static addActiveProjectTask(){
    const allTask = Task.getTask()
   const allProjects = UI.getProjectName()
    let giveMeActiveProject = parseInt(UI.getSelected()[0])||0
    if(giveMeActiveProject){
      giveMeActiveProject =giveMeActiveProject
    }else{
      giveMeActiveProject =0
    }
    var sectionOne = document.getElementById('section-1');
    sectionOne.innerHTML=''
    var mainTaskContain = document.createElement('div');
    var title = document.createElement('h4');
    if(allTask.length!=0){
      console.log(giveMeActiveProject)
        allTask.forEach(task =>{
        if(task.createBy===allProjects[giveMeActiveProject].name){
        sectionOne.classList.remove('d-none')
        sectionOne.classList.add('d-block','mt-3')
        const taskTitle=document.createElement('h5')
        taskTitle.innerHTML = task.title
        mainTaskContain.classList.add('d-flex','flex-wrap','justify-content-around')
        taskTitle.classList.add('text-success','bg-grey','card-title')
        const  cardContain = document.createElement('div')
        cardContain.classList.add('card')
        const  cardBody = document.createElement('div')
        cardBody.classList.add('card-body')
        const  taskDate = document.createElement('p')
        taskDate.innerHTML = task.date
        taskDate.classList.add('card-text')
        const taskDescription = document.createElement('p')
        taskDescription.innerHTML = task.description
        const addHeader = document.getElementById('add-class-header');
        title.innerHTML = task.createBy;
        title.classList.add('text-center')
        cardBody.appendChild(taskTitle)
        cardBody.appendChild(taskDescription)
        cardBody.appendChild(taskDate)
        cardContain.appendChild(cardBody)
        mainTaskContain.appendChild(cardContain)
        sectionOne.appendChild(mainTaskContain)
        // sectionOne.appendChild(adtask)
      }
    })
   const plusBtn = document.createElement('div')
   plusBtn.innerHTML = '+'
   plusBtn.style.cursor ='pointer'
   sectionOne.appendChild(mainTaskContain)
   sectionOne.insertBefore(title,sectionOne.firstChild)
   sectionOne.appendChild(plusBtn)
   plusBtn.addEventListener('click',()=>{
     const taskForm = document.getElementById('task-form')
     taskForm.classList.remove('d-none')
     taskForm.classList.add('d-block')
   })
    }
    // else{
    //   sectionOne = document.getElementById('section-1');
    //   sectionOne.classList.remove('d-none')
    //   sectionOne.classList.add('d-block','mt-3')
    //   const plusBtn = document.createElement('div')
    //   //const titre = document.createElement('div')
    //   // titre.innerHTML="default"
    //   // titre.classList.add('text-center')
    //   plusBtn.innerHTML = '+'
    //   plusBtn.style.cursor ='pointer'
    //   //sectionOne.appendChild(titre)
    //   sectionOne.appendChild(plusBtn)
    //   plusBtn.addEventListener('click',()=>{
    //     const taskForm = document.getElementById('task-form')
    //     taskForm.classList.remove('d-none')
    //     taskForm.classList.add('d-block')
    //   })
    // }
  }
  static renderDefault(){
    const deefaultElement = UI.getProjectName()
    if (deefaultElement.length===0){
      const defaault =new Project('default',0)
      UI.storeProjectName(defaault)
    }
    const deefaultElementOne = UI.getProjectName()
  const sideNave = document.getElementById('sideNavListchild');
      const deefault =document.createElement('li')
      deefault.innerHTML = `${deefaultElementOne[0].name}`
      deefault.classList.add('text-white','text-center','list-unstyled')
      deefault.style.cursor ='pointer'
      deefault.addEventListener('click',()=>{
        UI.synchro(deefault)
          // document.getElementById('section-1').innerHTML =''
         UI.addActiveProjectTask()
          // UI.delay()
      })
      sideNave.appendChild(deefault)
       document.getElementById('section-1').innerHTML =''
       UI.addActiveProjectTask()
  }
  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className} text-center`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('#section-1');
    container.appendChild(div);
  }
  static synchro(argument){
    const sectionOne = document.getElementById('section-1');
    sectionOne.innerHTML ='';
    sectionOne.classList.remove('d-none');
    sectionOne.classList.add('d-block');
    const addHeader = document.getElementById('add-class-header');
    const title = document.createElement('h4');
    const adtask = document.createElement('div');
    const plusBtn = document.createElement('div');
    plusBtn.innerHTML = '+';
    plusBtn.style.cursor ='pointer';
    adtask.innerHTML = 'Add task';
    adtask.appendChild(plusBtn);
    title.innerHTML = argument.textContent;
    plusBtn.addEventListener('click',()=>{
      const taskForm = document.getElementById('task-form');
      taskForm.classList.remove('d-none');
      taskForm.classList.add('d-block');
    })
    adtask.appendChild(plusBtn)
    sectionOne.appendChild(adtask)
    sectionOne.insertBefore(title,adtask)
  }
  static displayAddTask(){
    const sectionOne = document.getElementById('section-1')
    sectionOne.classList.remove('d-none')
    sectionOne.classList.add('d-block')
  }
  static renderSelected(element){
    const storedProjects = UI.getProjectName();
    const mainContain= document.getElementById('sideNavListchild')
    mainContain.innerHTML = ''
    UI.renderDefault()
    storedProjects.forEach(project => {
      if(project.number!=0){
        const nextElement = document.createElement('li');
        nextElement.innerHTML = `${project.name}<i class="fas ml-5 fa-trash-alt" ></i>`;
        nextElement.classList.add('text-white', 'text-center', 'mt-4','list-unstyled');
        nextElement.id =  project.number
        if(parseInt(element[0])=== parseInt(nextElement.id)){
          nextElement.classList.add('text-danger');
          UI.synchro(nextElement);
        }
        nextElement.style.cursor = 'pointer';
        mainContain.appendChild(nextElement)
        nextElement.children[0].setAttribute('onclick', `removeProject(${project.number})`)
    }})
}
static renderRefresh(){
  const currentItemId = UI.getSelected()
  UI.renderSelected(currentItemId)
}
static addProjectName() {
    const storedProjects = UI.getProjectName();
    const mainContain= document.getElementById('sideNavListchild');
    mainContain.innerHTML = '';
    //UI.renderDefault()
    storedProjects.forEach(project => {
      if(project.number!=0){
        const nextElement = document.createElement('li');
        nextElement.innerHTML = `${project.name}<i class="fas ml-5 fa-trash-alt" ></i>`;
        nextElement.classList.add('text-white', 'text-center', 'mt-4','list-unstyled');
        nextElement.id =  project.number
        nextElement.style.cursor = 'pointer';
        mainContain.appendChild(nextElement);
        mainContain.addEventListener('click',e =>{
          if(e.target.tagName.toLowerCase()==='li'){
            // document.getElementById('section-1').classList.add('d-block')
            UI.displayAddTask()
            UI.storeSelected(e.target.id)
            const selectedId = UI.getSelected()
            UI.renderSelected(selectedId)
            const taskForm = document.getElementById('task-form')
            taskForm.classList.remove('d-block')
            taskForm.classList.add('d-none')
            e.target.setAttribute('onclick',UI.synchro(e.target))
            // renderAddTaskScreen(parseInt(e.target.id))
          }
        })
        nextElement.children[0].setAttribute('onclick', `removeProject(${project.number})`)
    }})
}
}




