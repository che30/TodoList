/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Project.js":
/*!************************!*\
  !*** ./src/Project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Project)\n/* harmony export */ });\nclass Project {\n  constructor(name, number) {\n    this.name = name;\n    this.number = number;\n    this.tasks = [];\n  }\n\n  storeProject() {\n    const projects = JSON.parse(localStorage.getItem('projects')) || [];\n    projects.push({\n      name: this.name,\n      number: this.number,\n      tasks: this.tasks,\n    });\n    localStorage.setItem('projects', JSON.stringify(projects));\n  }\n}\n\n\n//# sourceURL=webpack://todolist/./src/Project.js?");

/***/ }),

/***/ "./src/Task.js":
/*!*********************!*\
  !*** ./src/Task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Task)\n/* harmony export */ });\nclass Task {\n  constructor(description, date, priority, createBy) {\n    this.description = description;\n    this.date = date;\n    this.priority = priority;\n    // this.now = now;\n    this.createBy = createBy;\n  }\n\n  // static getTask() {\n  //   let tasks = JSON.parse(localStorage.getItem('tasks')) || []\n  //   return tasks;\n  // }\n\n  // static storeTask(task) {\n  //   const tasks = Task.getTask();\n  //   tasks.push(task);\n  //   localStorage.setItem('tasks', JSON.stringify(tasks));\n  // }\n}\n\n//# sourceURL=webpack://todolist/./src/Task.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ \"./src/Project.js\");\n/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Task */ \"./src/Task.js\");\n\n\n\nconst arrow = document.getElementById('down-arrow');\n// Add default project\nconst projectsContainer = document.getElementById('projects-container');\nprojectsContainer.classList.add('w-100');\nconst mainContainer = document.createElement('div');\nmainContainer.classList.add('main__project__container');\nconst defaultProject = document.createElement('div');\nconst taskSection = document.getElementById('task-section');\n// taskSection.classList.add('task__section','bg-success');\nconst body = document.querySelector('body');\nconst submitOne = document.getElementById('submit-one');\nconst plusBtnSection = document.createElement('section');\nconst plusBtn = document.createElement('div');\nconst taskForm = document.getElementById('taskForm');\nconst cancelbtn = document.getElementById('cancel');\nconst submitTwo = document.getElementById('submitTwo');\nconst taskProgressSection = document.createElement('section');\nprojectsContainer.appendChild(mainContainer);\n\narrow.addEventListener('click', () => {\n  if (arrow.innerHTML === '&gt;') {\n    arrow.innerHTML = '&#8964';\n    document.querySelector('.main__project__container').classList.remove('d-none');\n  } else {\n    arrow.innerHTML = '&gt';\n    document.querySelector('.main__project__container').classList.add('d-none');\n  }\n});\nconst firstRender = () => {\n  defaultProject.innerHTML = 'Default';\n  defaultProject.style.cursor = 'pointer';\n  defaultProject.setAttribute('id', 'default-project');\n  mainContainer.appendChild(defaultProject);\n};\n\n// Adding a new Project\nsubmitOne.addEventListener('click', () => {\n  const title = document.getElementById('title');\n  if (title.value !== '') {\n    const projects = JSON.parse(localStorage.getItem('projects')) || [];\n    if (projects.length === 0) {\n      const newProject = new _Project__WEBPACK_IMPORTED_MODULE_0__.default(title.value, 1);\n\n      newProject.storeProject();\n      // Appending Newly created Project\n      const mainProjectChild = document.createElement('div');\n      mainProjectChild.innerHTML = `<span id=\"1-p\">${title.value}</span> `\n     + '<span> <i class=\"fas ml-1 fa-trash-alt\" ></i></span>';\n      mainProjectChild.style.cursor = 'pointer';\n      mainContainer.appendChild(mainProjectChild);\n    } else {\n      const num = projects[projects.length - 1].number + 1;\n      const newProject = new _Project__WEBPACK_IMPORTED_MODULE_0__.default(title.value, num);\n      newProject.storeProject();\n      const mainProjectChild = document.createElement('div');\n      mainProjectChild.innerHTML = `<span id=${num}-p>${title.value}</span> `\n      + '<span> <i class=\"fas ml-1 fa-trash-alt\" ></i></span>';\n      mainProjectChild.style.cursor = 'pointer';\n      mainProjectChild.setAttribute('id', `${num}-p`);\n      // mainProjectChild.addEventListener('click', ()=>{\n      //   delProject(num);\n      // })\n      // title.value = '';\n      mainContainer.appendChild(mainProjectChild);\n    }\n  }\n});\nconst retrieveLocalStorage = () => JSON.parse(localStorage.getItem('projects'));\nconst delProject = (id) => {\n  const projects = retrieveLocalStorage();\n  projects.map((elt, index) => {\n    if (elt.number === Number(id)) {\n      projects.splice(index, 1);\n      localStorage.setItem('projects', JSON.stringify(projects));\n      document.getElementById(id).parentNode.remove();\n      // const mainc = document.querySelector('.main__project__container').childNodes;\n      // mainc.forEach((elt, index) => {\n      //   if (index > 0) {\n      //     elt.innerHTML = '';\n      //   }\n      // });\n      // rerenderProjects();\n    }\n    return true;\n  });\n};\n\nconst rerenderProjects = () => {\n  const store = retrieveLocalStorage();\n  if (store && store.length !== 0) {\n    store.forEach(element => {\n      if (element.number !== 0) {\n        const mainProjectChild = document.createElement('div');\n        const contain = document.createElement('div');\n        contain.classList.add('d-flex', 'justify-content-center');\n        const projecName = document.createElement('div');\n        projecName.innerHTML = element.name;\n        projecName.style.cursor = 'pointer';\n        projecName.setAttribute('id', `${element.number}-p`);\n        const delIcon = document.createElement('div');\n        delIcon.innerHTML = `<span> <i class=\"fas ml-1 fa-trash-alt\" id=${element.number} ></i></span>`;\n        delIcon.style.cursor = 'pointer';\n        contain.appendChild(projecName);\n        contain.appendChild(delIcon);\n        mainProjectChild.appendChild(contain);\n        delIcon.setAttribute('id', element.number);\n        // delIcon.setAttribute('click',`${delProject(delIcon.id)}`)\n        delIcon.addEventListener('click', () => {\n          delProject(delIcon.id);\n        });\n        mainContainer.appendChild(mainProjectChild);\n      }\n    });\n  }\n};\n\nconst progressSec = () => {\n  const taskProgress = document.createElement('div');\n  taskProgress.classList.add('text-center');\n  taskProgress.setAttribute('id', 'taskProgrossSection');\n  taskProgressSection.appendChild(taskProgress);\n};\nconst rerenderDefaultTask = () => {\n  taskSection.classList.add('task__section');\n  const activeProject = document.createElement('div');\n  activeProject.innerHTML = 'Default';\n  activeProject.classList.add('text-center');\n  taskSection.appendChild(activeProject);\n  progressSec();\n  body.appendChild(taskSection);\n  body.appendChild(taskProgressSection);\n};\nconst taskbutton = () => {\n  plusBtnSection.appendChild(plusBtn);\n  plusBtn.setAttribute('id', 'plusBtn');\n  plusBtn.innerHTML = '+';\n  body.appendChild(plusBtnSection);\n};\nconst getActiveTask = () => {\n  const activeTask = JSON.parse(localStorage.getItem('active'));\n  return activeTask;\n};\nconst renderTask = () => {\n  const projects = retrieveLocalStorage();\n  let activeProject = getActiveTask();\n  if (activeProject === null) {\n    activeProject = 0;\n  }\n  const taskContainer = document.createElement('div');\n  projects.forEach(project => {\n    if (project.tasks.length !== 0 && project.number === Number(activeProject)) {\n      project.tasks.forEach(task => {\n        const flexContain = document.createElement('div');\n        flexContain.classList.add('d-flex', 'align-items-center', 'bg-info', 'w-50', 'mx-auto');\n        const testTask = document.createElement('div');\n        testTask.innerHTML = task.description;\n        testTask.style.cursor = 'pointer';\n        testTask.innerHTML = task.description;\n        testTask.style.fontSize = '2rem';\n        testTask.classList.add('text-center');\n        const radio = document.createElement('input');\n        radio.setAttribute('type', 'radio');\n        flexContain.appendChild(radio);\n        flexContain.appendChild(testTask);\n        taskContainer.appendChild(flexContain);\n      });\n      taskSection.appendChild(taskContainer);\n    }\n  });\n};\nconst saveActiveProject = (active) => {\n  localStorage.setItem('active', JSON.stringify(active));\n};\nsaveActiveProject(null);\nprojectsContainer.addEventListener('click', (e) => {\n  if (e.target.innerHTML !== '&gt;'\n   && e.target.innerHTML !== '&#8964'\n    && e.target.innerHTML !== '⌄'\n    && e.target.innerHTML !== 'projects') {\n    taskSection.innerHTML = '';\n    plusBtnSection.innerHTML = '';\n    taskForm.classList.add('d-none');\n    plusBtn.style.left = '630px';\n    saveActiveProject(e.target.id.slice(0, 1));\n    let taskId;\n    if (e.target.id.slice(0, 1) === 'd') {\n      saveActiveProject(0);\n      taskId = '0-t';\n    } else {\n      taskId = `${e.target.id.slice(0, 1)}-t`;\n    }\n    taskProgressSection.innerHTML = '';\n    const activeProject = document.createElement('div');\n    progressSec();\n    activeProject.innerHTML = e.target.innerHTML;\n    activeProject.setAttribute('id', `${taskId}`);\n    activeProject.classList.add('text-center');\n    taskSection.appendChild(activeProject);\n    body.appendChild(taskSection);\n    renderTask();\n  }\n  taskbutton();\n  body.appendChild(taskProgressSection);\n});\n\nplusBtn.addEventListener('click', () => {\n  const activeId = getActiveTask();\n  body.append(taskForm);\n  body.appendChild(plusBtn);\n  if (activeId !== null) {\n    taskForm.classList.remove('d-none');\n    plusBtn.style.left = '320px';\n  }\n  let activeProjectId = getActiveTask();\n  if (activeProjectId === 'd') {\n    activeProjectId = 0;\n  }\n});\ncancelbtn.addEventListener('click', () => {\n  taskForm.classList.add('d-none');\n  plusBtn.style.left = '630px';\n});\n\nconst storeDefaultProject = () => {\n  const store = retrieveLocalStorage();\n  if (store === null) {\n    const projectZero = new _Project__WEBPACK_IMPORTED_MODULE_0__.default('Default', 0);\n    projectZero.storeProject();\n  }\n};\n\nsubmitTwo.addEventListener('click', () => {\n  taskSection.childNodes.forEach((elt, index) => {\n    if (index > 0) {\n      elt.innerHTML = '';\n    }\n  });\n  let tasks = [];\n  const formElements = document.forms[1].getElementsByTagName('input');\n  // const taskTitle = formElements[0];\n  const taskDiscription = formElements[0];\n  const taskDate = formElements[1];\n  let taskPriority = document.getElementById('priorities');\n  const activeProject = getActiveTask();\n  const allprojects = retrieveLocalStorage();\n  taskPriority = taskPriority.options[taskPriority.selectedIndex].value;\n  if (taskDiscription.value !== ''\n   && taskDate.value !== '') {\n    const newTask = new _Task__WEBPACK_IMPORTED_MODULE_1__.default(taskDiscription.value,\n      taskDate.value,\n      taskPriority, activeProject);\n    if (activeProject === 'd' || activeProject === 0) {\n      tasks = allprojects[0].tasks;\n      tasks.push(newTask);\n      allprojects[0].tasks = tasks;\n      localStorage.setItem('projects', JSON.stringify(allprojects));\n    } else {\n      tasks = allprojects[activeProject].tasks;\n      tasks.push(newTask);\n      allprojects[activeProject].tasks = tasks;\n      localStorage.setItem('projects', JSON.stringify(allprojects));\n    }\n    taskDiscription.value = '';\n    taskDate.value = '';\n    renderTask();\n  }\n});\n\ntaskSection.addEventListener('click', (e) => {\n  if (e.target.tagName === 'INPUT') {\n    const trashContainer = [];\n    const allcheckedinputs = document.querySelectorAll('input:checked');\n    allcheckedinputs.forEach(elt => {\n      trashContainer.push(elt.nextSibling.innerHTML);\n    });\n    // console.log(trashContainer);\n    const retrievedTask = getActiveTask() || 0;\n    let storedProjects = retrieveLocalStorage();\n    const unmodifiedProjects = storedProjects;\n    // let modified = storedProjects;\n\n    storedProjects.forEach(project => {\n      if ((project.number === Number(retrievedTask))) {\n        storedProjects = project;\n      }\n    });\n    const countActiveProjects = storedProjects.tasks.length - allcheckedinputs.length;\n    const message = document.createElement('div');\n    const trash = document.createElement('span');\n    trash.innerHTML = ' <i class=\"fas ml-1 fa-trash-alt\"></i>';\n    trash.classList.add('d-inline-flex');\n    trash.style.cursor = 'pointer';\n    message.classList.add('text-center');\n    message.setAttribute('id', 'msg');\n    taskProgressSection.childNodes.forEach((node, index) => {\n      if (index > 0) {\n        node.innerHTML = '';\n      }\n    });\n    const progrestask = document.getElementById('taskProgrossSection');\n    progrestask.innerHTML = '';\n    progrestask.appendChild(message);\n    progrestask.appendChild(trash);\n    if (e.target.type === 'radio') {\n      e.target.nextSibling.style.textDecoration = 'line-through';\n      const tempTasks = storedProjects.tasks;\n      tempTasks.map(elt => {\n        trashContainer.map(elt2 => {\n          if (elt.description === elt2) {\n            const removeIndex = tempTasks.findIndex(item => item.description === elt2);\n            tempTasks.splice(removeIndex, 1);\n          }\n          return true;\n        });\n        return true;\n      });\n      storedProjects = tempTasks;\n      unmodifiedProjects[retrievedTask].tasks = storedProjects;\n      message.innerHTML = `${countActiveProjects} tasks remaining `;\n      trash.addEventListener('click', () => {\n        localStorage.setItem('projects', JSON.stringify(unmodifiedProjects));\n        taskSection.childNodes.forEach((node, index) => {\n          if (index > 1) {\n            node.innerHTML = '';\n          }\n        });\n        renderTask();\n      });\n    }\n  }\n});\ndocument.addEventListener('DOMContentLoaded',\n  storeDefaultProject(),\n  firstRender(),\n  rerenderProjects(),\n  rerenderDefaultTask(), taskbutton(), renderTask());\n\n\n\n//# sourceURL=webpack://todolist/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;