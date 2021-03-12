export default class UI {
  static getProjectName() {
    let projects;
    if (localStorage.getItem('projects') === null) {
      projects = [];
    } else {
      projects = JSON.parse(localStorage.getItem('projects'));
    }

    return projects;
  }

  static storeProjectName(project) {
    const projects = UI.getProjectName();
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static countProject() {
    let currentNumber = Number(localStorage.getItem('lastProjectId'));
    if (currentNumber === null) {
      currentNumber = 0;
    } else {
      currentNumber += 1;
      localStorage.setItem('lastProjectId', currentNumber);
    }

    return currentNumber;
  }
  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className} text-center`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('#section-1');
    container.appendChild(div);
  }

  static getTask() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      projects = JSON.parse(localStorage.getItem('tasks'));
    }

    return tasks;
  }

  static storeTask(task) {
    const tasks = UI.getTask();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify('tasks'));
  }

  static addProjectName() {
    const sideNave = document.getElementById('sideNav')
    sideNave.innerHTML = ''
    const storedProjects = UI.getProjectName() 
    storedProjects.forEach(project => {
      const nextElement = document.createElement('div')
      nextElement.innerHTML = project.name + '<i class="fas ml-5 fa-trash-alt" ></i>'
      nextElement.classList.add('text-white','text-center','mt-4')
      nextElement.style.cursor ='pointer'
      nextElement.addEventListener('click',()=>{
        const sectionTwo = document.getElementById('section-2');
        const sectionThree = document.getElementById('section-3');
        const newDiv = document.createElement('h1');
        newDiv.classList.add('text-center')
        newDiv.innerHTML = project.name
        sectionThree.insertBefore(newDiv,sectionTwo)

      })
      sideNave.appendChild(nextElement)
      nextElement.children[0].id=project.number
      nextElement.children[0].setAttribute('onclick', `removeProject(${project.number})`)
    });

  }
  
}
// localStorage.clear()