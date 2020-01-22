/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\nvar byteToHex = [];\nfor (var i = 0; i < 256; ++i) {\n  byteToHex[i] = (i + 0x100).toString(16).substr(1);\n}\n\nfunction bytesToUuid(buf, offset) {\n  var i = offset || 0;\n  var bth = byteToHex;\n  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4\n  return ([\n    bth[buf[i++]], bth[buf[i++]],\n    bth[buf[i++]], bth[buf[i++]], '-',\n    bth[buf[i++]], bth[buf[i++]], '-',\n    bth[buf[i++]], bth[buf[i++]], '-',\n    bth[buf[i++]], bth[buf[i++]], '-',\n    bth[buf[i++]], bth[buf[i++]],\n    bth[buf[i++]], bth[buf[i++]],\n    bth[buf[i++]], bth[buf[i++]]\n  ]).join('');\n}\n\nmodule.exports = bytesToUuid;\n\n\n//# sourceURL=webpack:///./node_modules/uuid/lib/bytesToUuid.js?");

/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Unique ID creation requires a high quality random # generator.  In the\n// browser this is a little complicated due to unknown quality of Math.random()\n// and inconsistent support for the `crypto` API.  We do the best we can via\n// feature-detection\n\n// getRandomValues needs to be invoked in a context where \"this\" is a Crypto\n// implementation. Also, find the complete implementation of crypto on IE11.\nvar getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||\n                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));\n\nif (getRandomValues) {\n  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto\n  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef\n\n  module.exports = function whatwgRNG() {\n    getRandomValues(rnds8);\n    return rnds8;\n  };\n} else {\n  // Math.random()-based (RNG)\n  //\n  // If all else fails, use Math.random().  It's fast, but is of unspecified\n  // quality.\n  var rnds = new Array(16);\n\n  module.exports = function mathRNG() {\n    for (var i = 0, r; i < 16; i++) {\n      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;\n      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;\n    }\n\n    return rnds;\n  };\n}\n\n\n//# sourceURL=webpack:///./node_modules/uuid/lib/rng-browser.js?");

/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var rng = __webpack_require__(/*! ./lib/rng */ \"./node_modules/uuid/lib/rng-browser.js\");\nvar bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ \"./node_modules/uuid/lib/bytesToUuid.js\");\n\nfunction v4(options, buf, offset) {\n  var i = buf && offset || 0;\n\n  if (typeof(options) == 'string') {\n    buf = options === 'binary' ? new Array(16) : null;\n    options = null;\n  }\n  options = options || {};\n\n  var rnds = options.random || (options.rng || rng)();\n\n  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n  rnds[6] = (rnds[6] & 0x0f) | 0x40;\n  rnds[8] = (rnds[8] & 0x3f) | 0x80;\n\n  // Copy bytes to buffer, if provided\n  if (buf) {\n    for (var ii = 0; ii < 16; ++ii) {\n      buf[i + ii] = rnds[ii];\n    }\n  }\n\n  return buf || bytesToUuid(rnds);\n}\n\nmodule.exports = v4;\n\n\n//# sourceURL=webpack:///./node_modules/uuid/v4.js?");

/***/ }),

/***/ "./src/components/createDom.js":
/*!*************************************!*\
  !*** ./src/components/createDom.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createProject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createProject */ \"./src/components/createProject.js\");\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ \"./src/components/storage.js\");\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utility */ \"./src/utility.js\");\n\n\n\n\nconst createTask = (() => {\n  const names = ['title', 'description', 'dueDate', 'priority', 'category'];\n  let form;\n  let select;\n  const render = param => {\n    const root = document.querySelector('#root');\n    const row = Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHtmlElement\"])('div', { class: 'row', id: 'create' });\n    const container = Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHtmlElement\"])('div', { class: 'container' });\n    const wrapper = Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHtmlElement\"])('div', { class: 'form-wrapper' });\n    const header2 = document.createElement('h2');\n\n    form = document.createElement('form');\n    form.classList.add('form');\n    const namesArr = ['title', 'description'];\n    for (const name of namesArr) {\n      const input = document.createElement('input');\n      input.setAttribute('type', 'text');\n      input.setAttribute('name', name);\n      input.setAttribute('placeholder', name);\n      input.setAttribute('class', `input ${name}`);\n      form.append(input);\n    }\n    const dueDate = document.createElement('input');\n    dueDate.setAttribute('type', 'date');\n    dueDate.setAttribute('name', 'dueDate');\n    dueDate.setAttribute('class', 'dueDate');\n\n    const priorityArr = ['select priority', 'urgent', 'Important', 'Normal'];\n    select = document.createElement('select');\n    select.setAttribute('name', 'select');\n    select.setAttribute('class', 'select');\n    for (const priority of priorityArr) {\n      const option = document.createElement('option');\n      option.setAttribute('type', 'text');\n      option.setAttribute('class', 'input');\n      option.innerHTML = priority;\n      select.append(option);\n    }\n\n    const category = document.createElement('input');\n    category.setAttribute('type', 'text');\n    category.setAttribute('name', 'category');\n    category.setAttribute('class', 'category input');\n\n    const submitButton = document.createElement('div');\n    submitButton.setAttribute('value', 'create a todo');\n    submitButton.setAttribute('data-target', 'show');\n    submitButton.setAttribute('class', 'createTodo input');\n    submitButton.setAttribute('type', 'submit');\n\n    submitButton.innerText = 'submit';\n    submitButton.addEventListener('click', createProject);\n\n    const content = form.querySelectorAll('.input');\n    const header = Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHeader\"])(content, header2);\n\n    root.append(row);\n    row.append(container);\n    container.append(wrapper);\n    form.append(dueDate);\n    form.append(select);\n    form.append(category);\n    wrapper.append(header, form, submitButton);\n\n    form.querySelector('.category').value = param;\n  };\n\n  const createProject = evt => {\n    evt.preventDefault();\n    const title = form.querySelector('.title').value;\n    const description = form.querySelector('.description').value;\n    const dueDate = form.querySelector('.dueDate').value;\n    const priority = form.querySelector('.select').value;\n    const category = form.querySelector('.category').value;\n\n    // decoupling should be done here\n    const todo = Object(_createProject__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(title, description, dueDate, priority, category);\n\n    _storage__WEBPACK_IMPORTED_MODULE_1__[\"default\"].addTodoItem(todo.toJson().category, todo.toJson());\n\n    let currentPage = evt.target.getAttribute('data-target');\n    document.querySelector('.active').classList.remove('active');\n    document.getElementById(currentPage).classList.add('active');\n\n    Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./show */ \"./src/components/show.js\")).then(module => {\n      if (evt.target.classList.contains('createTodo')) {\n        module.default.render(todo.toJson().category);\n      }\n    });\n  };\n\n  return {\n    render\n  };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createTask);\n\n\n//# sourceURL=webpack:///./src/components/createDom.js?");

/***/ }),

/***/ "./src/components/createProject.js":
/*!*****************************************!*\
  !*** ./src/components/createProject.js ***!
  \*****************************************/
/*! exports provided: Project, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Project\", function() { return Project; });\n/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid/v4 */ \"./node_modules/uuid/v4.js\");\n/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid_v4__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst Todo = (title, description, dueDate, priority, category) => {\n  const getTitle = () => title;\n  const getDescription = () => description;\n  const getDueDate = () => dueDate;\n  const getPriority = () => priority;\n  const getCategory = () => category;\n\n  function toJson() {\n    return {\n      title: getTitle(),\n      description: getDescription(),\n      dueDate: getDueDate(),\n      priority: getPriority(),\n      category: getCategory()\n    };\n  }\n\n  return {\n    getTitle,\n    getDescription,\n    getDueDate,\n    getPriority,\n    getCategory,\n    toJson\n  };\n};\n\nclass Project {\n  constructor(name) {\n    this.id = uuid_v4__WEBPACK_IMPORTED_MODULE_0___default()();\n    this.name = name;\n    this.todos = [];\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Todo);\n\n\n//# sourceURL=webpack:///./src/components/createProject.js?");

/***/ }),

/***/ "./src/components/home.js":
/*!********************************!*\
  !*** ./src/components/home.js ***!
  \********************************/
/*! exports provided: renderHome */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderHome\", function() { return renderHome; });\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ \"./src/components/storage.js\");\n/* harmony import */ var _createProject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createProject */ \"./src/components/createProject.js\");\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utility */ \"./src/utility.js\");\n\n\n\n\n\nconst rightPanel = Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHtmlElement\"])('div', { class: 'rightPanel' });\nconst addProjectButton = Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHtmlElement\"])(\n  'button',\n  { class: 'createProject' },\n  'Add Project'\n);\nlet submitProjectButton;\nlet textfield;\n\nconst renderHome = () => {\n  const root = document.querySelector('#root');\n  const row = Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHtmlElement\"])('div', {\n    class: 'row row1 active',\n    id: 'home'\n  });\n\n  const container = Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHtmlElement\"])('div', { class: 'container' });\n  const homeWrapper = Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHtmlElement\"])('div', { class: 'homeWrapper' });\n\n  const leftPanel = Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHtmlElement\"])('div', { class: 'leftPanel' });\n\n  let projectButton;\n\n  root.append(row);\n  row.append(container);\n  container.append(homeWrapper);\n\n  let projects = _storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getProjects();\n\n  projects.forEach(project => {\n    projectButton = Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHtmlElement\"])(\n      'button',\n      {\n        'data-target': 'show',\n        'data-projectid': project.id,\n        class: 'buttonProject'\n      },\n      project.name\n    );\n\n    const createTodo = Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHtmlElement\"])(\n      'button',\n      {\n        type: 'submit',\n        value: 'create a todo',\n        'data-target': 'create',\n        'data-name': project.name\n      },\n      'Add Todo'\n    );\n\n    const editButton = Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHtmlElement\"])(\n      'button',\n      {\n        class: 'editButton',\n        'data-id': project.id\n      },\n      'Edit'\n    );\n\n    const deleteButton = Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHtmlElement\"])(\n      'button',\n      {\n        class: 'deleteButton',\n        'data-target': project.name\n      },\n      'Delete'\n    );\n\n    const wrapper = Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHtmlElement\"])('div', {\n      class: 'wrapper'\n    });\n\n    leftPanel.append(wrapper);\n    wrapper.append(projectButton);\n    wrapper.append(createTodo);\n    wrapper.append(editButton);\n    wrapper.append(deleteButton);\n    projectButton.addEventListener('click', render);\n    createTodo.addEventListener('click', navigation);\n    deleteButton.addEventListener('click', evt => {\n      _storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].deleteProject(evt);\n      renderHome();\n    });\n    editButton.addEventListener('click', () => showEditForm(project));\n  });\n\n  homeWrapper.append(leftPanel);\n  leftPanel.append(addProjectButton);\n  homeWrapper.append(rightPanel);\n\n  addProjectButton.addEventListener('click', showTextField);\n};\n\nconst showEditForm = project => {\n  const projectNameTextField = 'project-name';\n  const updateButtonId = 'update-btn';\n  let form = rightPanel.querySelector('#edit-project-form');\n  if (form) {\n    Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"updateHtmlElement\"])(form.querySelector(`#${projectNameTextField}`), {\n      value: project.name\n    });\n    Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"updateHtmlElement\"])(form.querySelector(`#${updateButtonId}`), {\n      'data-projectId': project.id\n    });\n  } else {\n    form = Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHtmlElement\"])('form', {\n      class: 'showEditForm',\n      id: 'edit-project-form'\n    });\n\n    form.append(\n      Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHtmlElement\"])('input', {\n        id: projectNameTextField,\n        value: project.name\n      })\n    );\n\n    form.append(\n      Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHtmlElement\"])(\n        'button',\n        {\n          id: updateButtonId,\n          'data-projectId': project.id\n        },\n        'update'\n      )\n    );\n\n    rightPanel.append(form);\n  }\n\n  form\n    .querySelector(`#${updateButtonId}`)\n    .addEventListener('click', updateProject);\n};\n\nconst updateProject = evt => {\n  evt.preventDefault();\n  const projectId = evt.target.dataset.projectid;\n  const form = document.querySelector('#edit-project-form');\n  const newProjectName = form.querySelector('#project-name').value;\n\n  if (!newProjectName || newProjectName === '') {\n    alert('please enter a valid project name');\n    return;\n  }\n\n  const project = _storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getProjectById(projectId);\n\n  project.name = newProjectName;\n  _storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].updateProject(projectId, project);\n  renderHome();\n  location.reload();\n  form.parentNode.removeChild(form);\n};\n\nfunction navigation(evt) {\n  const param = evt.target.dataset.name;\n  evt.preventDefault();\n  Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./createDom */ \"./src/components/createDom.js\"))\n    .then(module => {\n      const create = module.default;\n      create.render(param);\n    })\n    .then(() => {\n      let currentPage = evt.target.getAttribute('data-target');\n      document.querySelector('.active').classList.remove('active');\n      document.getElementById(currentPage).classList.add('active');\n    });\n}\n\nfunction render(evt) {\n  Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./show */ \"./src/components/show.js\"))\n    .then(module => {\n      module.default.render(evt.target.innerText);\n    })\n    .then(() => {\n      let currentPage = evt.target.getAttribute('data-target');\n      document.querySelector('.active').classList.remove('active');\n      document.getElementById(currentPage).classList.add('active');\n    });\n}\n\nconst showTextField = evt => {\n  const form = Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHtmlElement\"])('form', { class: 'projectForm' });\n  textfield = Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHtmlElement\"])('input', { id: 'projectInput' });\n  submitProjectButton = Object(_utility__WEBPACK_IMPORTED_MODULE_2__[\"createHtmlElement\"])(\n    'button',\n    {\n      type: 'submit',\n      value: 'Create Project'\n    },\n    'submit'\n  );\n  form.append(textfield);\n  form.append(submitProjectButton);\n  rightPanel.append(form);\n  submitProjectButton.addEventListener('click', addProjects);\n  addProjectButton.hidden = true;\n};\n\nconst addProjects = evt => {\n  evt.preventDefault();\n  const text = document.getElementById('projectInput').value;\n\n  if (!text || text === '') {\n    window.alert('Please enter a project title');\n    return;\n  }\n\n  const name = text.trim();\n\n  const exists = _storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].existsProject(name);\n\n  if (exists) {\n    window.alert(`Project name: ${name} is already taken`);\n    return;\n  }\n\n  const project = new _createProject__WEBPACK_IMPORTED_MODULE_1__[\"Project\"](text);\n  _storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addProject(project);\n\n  addProjectButton.hidden = false;\n  submitProjectButton.hidden = true;\n  textfield.hidden = true;\n  renderHome();\n  location.reload();\n};\n\nrenderHome();\n\n\n//# sourceURL=webpack:///./src/components/home.js?");

/***/ }),

/***/ "./src/components/show.js":
/*!********************************!*\
  !*** ./src/components/show.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ \"./src/components/storage.js\");\n/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utility */ \"./src/utility.js\");\n/* harmony import */ var _components_createProject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/createProject */ \"./src/components/createProject.js\");\n/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home */ \"./src/components/home.js\");\n\n\n\n\n\nconst show = (() => {\n  const root = document.querySelector('#root');\n  const row = Object(_utility__WEBPACK_IMPORTED_MODULE_1__[\"createHtmlElement\"])('div', {\n    class: 'row',\n    id: 'show'\n  });\n\n  const container = document.createElement('div');\n  let showWrapper = document.createElement('div');\n  container.classList.add('container');\n  showWrapper.classList.add('showWrapper');\n  let containerDiv;\n\n  let form;\n\n  const inputNames = [\n    'title',\n    'description',\n    'dueDate',\n    'priority',\n    'category'\n  ];\n\n  root.append(row);\n  row.append(container);\n  container.append(showWrapper);\n\n  const render = project => {\n    if (containerDiv) {\n      containerDiv.parentNode.removeChild(containerDiv);\n    }\n    containerDiv = document.createElement('div');\n    containerDiv.classList.add('containerDiv');\n\n    const header3 = document.createElement('h1');\n    header3.setAttribute('class', 'header3');\n    containerDiv.append(header3);\n\n    _storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getProjects().forEach(element => {\n      if (element.name === project) {\n        header3.innerText = `${project} Todos `;\n        element.todos.forEach((todo, index) => {\n          const containerTodo = document.createElement('div');\n          containerTodo.classList.add('containerTodo');\n\n          const header5 = document.createElement('h5');\n          const span1 = document.createElement('span');\n          span1.innerHTML = `Title: ${todo.title}`;\n          header5.appendChild(span1);\n\n          const descriptionDiv = document.createElement('p');\n          const span2 = document.createElement('span');\n          span2.innerHTML = `Description: ${todo.description}`;\n          descriptionDiv.appendChild(span2);\n\n          const dateTimeDiv = Object(_utility__WEBPACK_IMPORTED_MODULE_1__[\"createHtmlElement\"])('div', {}, null, null);\n          const span3 = document.createElement('span');\n          span3.innerHTML = `Due date: ${todo.dueDate}`;\n          dateTimeDiv.appendChild(span3);\n\n          const priorityDiv = Object(_utility__WEBPACK_IMPORTED_MODULE_1__[\"createHtmlElement\"])('div', {}, null, null);\n          const span4 = document.createElement('span');\n          span4.innerHTML = `Priority: ${todo.priority}`;\n          priorityDiv.appendChild(span4);\n\n          const categoryDiv = Object(_utility__WEBPACK_IMPORTED_MODULE_1__[\"createHtmlElement\"])('div', {}, null, null);\n          const span5 = document.createElement('span');\n          span5.innerHTML = `Category: ${todo.category}`;\n          categoryDiv.appendChild(span5);\n\n          const deleteButton = Object(_utility__WEBPACK_IMPORTED_MODULE_1__[\"createHtmlElement\"])(\n            'button',\n            {\n              'data-todoId': index,\n              'data-projectId': element.id\n            },\n            'Delete'\n          );\n\n          const editButton = Object(_utility__WEBPACK_IMPORTED_MODULE_1__[\"createHtmlElement\"])(\n            'button',\n            {\n              'data-todoId': index,\n              'data-projectId': element.id,\n              'data-target': 'updateTodo'\n            },\n            'Edit'\n          );\n\n          containerTodo.append(\n            header5,\n            descriptionDiv,\n            dateTimeDiv,\n            priorityDiv,\n            categoryDiv,\n            editButton,\n            deleteButton\n          );\n          containerDiv.appendChild(containerTodo);\n\n          deleteButton.addEventListener('click', deleteTodo);\n          editButton.addEventListener('click', showEditForm);\n\n          showWrapper.appendChild(containerDiv);\n        });\n      }\n    });\n  };\n\n  function showEditForm(evt) {\n    const index = evt.target.dataset.todoid;\n    const projectId = evt.target.dataset.projectid;\n    const header2 = document.createElement('h2');\n    header2.setAttribute('class', 'header2');\n    header2.innerText = 'Update Todo';\n    const todo = _storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getTodoItemById(projectId, index);\n\n    const names = {\n      title: todo.title,\n      description: todo.description,\n      dueDate: todo.dueDate,\n      priority: todo.priority,\n      checklist: todo.checklist,\n      category: todo.category\n    };\n\n    const root = document.querySelector('#root');\n    const row = Object(_utility__WEBPACK_IMPORTED_MODULE_1__[\"createHtmlElement\"])('div', { class: 'row', id: 'updateTodo' });\n    const container = Object(_utility__WEBPACK_IMPORTED_MODULE_1__[\"createHtmlElement\"])('div', { class: 'container' });\n    const wrapper = Object(_utility__WEBPACK_IMPORTED_MODULE_1__[\"createHtmlElement\"])('div', { class: 'form-wrapper' });\n\n    const btn = Object(_utility__WEBPACK_IMPORTED_MODULE_1__[\"createHtmlElement\"])('input', {\n      type: 'submit',\n      value: 'update todo',\n      'data-target': 'show',\n      'data-todoid': index,\n      'data-projectid': projectId,\n      class: 'updateTodo'\n    });\n\n    form = Object(_utility__WEBPACK_IMPORTED_MODULE_1__[\"createHtmlElement\"])('form');\n\n    root.append(row);\n    row.append(container);\n    container.append(wrapper);\n    wrapper.append(header2, form);\n\n    const newNames = ['title', 'description'];\n    for (const name of newNames) {\n      const input = document.createElement('input');\n      input.setAttribute('type', 'text');\n      input.setAttribute('name', name);\n      input.setAttribute('placeholder', name);\n      input.setAttribute('class', name);\n      form.append(input);\n    }\n    const dueDate = document.createElement('input');\n    dueDate.setAttribute('type', 'date');\n    dueDate.setAttribute('name', 'dueDate');\n    dueDate.setAttribute('class', 'dueDate');\n\n    const priorityArr = ['select priority', 'urgent', 'Important', 'Normal'];\n    const select = document.createElement('select');\n    select.setAttribute('class', 'select');\n    for (const priority of priorityArr) {\n      const option = document.createElement('option');\n      option.setAttribute('type', 'text');\n      option.setAttribute('name', 'select');\n      option.setAttribute('class', priority);\n      option.innerHTML = priority;\n      select.appendChild(option);\n    }\n\n    const checkList = document.createElement('input');\n    checkList.setAttribute('type', 'checkbox');\n    checkList.setAttribute('name', 'checklist');\n    checkList.setAttribute('class', 'checklist');\n\n    const category = document.createElement('input');\n    category.setAttribute('type', 'text');\n    category.setAttribute('name', 'category');\n    category.setAttribute('class', 'category');\n\n    form.append(dueDate, select, category);\n\n    document.querySelector('.title').value = names.title;\n    document.querySelector('.description').value = names.description;\n    document.querySelector('.dueDate').value = names.dueDate;\n    document.querySelector('.category').value = names.category;\n\n    form.append(btn);\n\n    btn.addEventListener('click', updateTodo);\n\n    let currentPage = evt.target.getAttribute('data-target');\n    document.querySelector('.active').classList.remove('active');\n    document.getElementById(currentPage).classList.add('active');\n  }\n\n  function updateTodo(evt) {\n    evt.preventDefault();\n\n    const title = form.querySelector('.title').value;\n    const description = form.querySelector('.description').value;\n    const dueDate = form.querySelector('.dueDate').value;\n    const priority = form.querySelector('.select').value;\n    const category = form.querySelector('.category').value;\n    console.log(form.querySelector('.select'));\n\n    // decoupling should be done here\n    const todo = Object(_components_createProject__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(title, description, dueDate, priority, category);\n\n    _storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].updateTodoItem(\n      evt.target.dataset.projectid,\n      evt.target.dataset.todoid,\n      todo.toJson()\n    );\n\n    let currentPage = evt.target.getAttribute('data-target');\n    document.querySelector('.active').classList.remove('active');\n    document.getElementById(currentPage).classList.add('active');\n    Object(_home__WEBPACK_IMPORTED_MODULE_3__[\"renderHome\"])();\n    location.reload();\n  }\n\n  function deleteTodo(evt) {\n    const { projectid, todoid } = evt.target.dataset;\n    const project = _storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getProjectById(projectid);\n    _storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].deleteTodoItem(projectid, todoid);\n    render(project.name);\n  }\n\n  return {\n    render,\n    root,\n    container\n  };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (show);\n\n\n//# sourceURL=webpack:///./src/components/show.js?");

/***/ }),

/***/ "./src/components/storage.js":
/*!***********************************!*\
  !*** ./src/components/storage.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst storage = (() => {\n  let store;\n  const storeKey = 'todos-database';\n\n  const getStorage = () => {\n    store = window.localStorage.getItem(storeKey);\n    if (!store) {\n      store = [];\n      window.localStorage.setItem(storeKey, JSON.stringify(store));\n    }\n\n    return store;\n  };\n\n  const getProjects = () => JSON.parse(getStorage());\n\n  /**\n   * Insert a new project into the store\n   * @param {Project} project\n   */\n  const addProject = project => {\n    const projects = [project, ...getProjects()];\n    window.localStorage.setItem(storeKey, JSON.stringify(projects));\n  };\n\n  function getProjectById(id) {\n    for (const project of getProjects()) {\n      if (project.id === id) {\n        return project;\n      }\n    }\n  }\n\n  function getTodoItemById(projectId, index) {\n    const project = getProjectById(projectId);\n    const todoItem = project.todos[index];\n    return todoItem;\n  }\n\n  const addTodoItem = (projectCategory, todoItem) => {\n    store = getProjects();\n    store.forEach(element => {\n      if (element['name'] === projectCategory) {\n        element.todos.push(todoItem);\n        window.localStorage.setItem(storeKey, JSON.stringify(store));\n      }\n    });\n  };\n\n  const deleteProject = evt => {\n    const store = getProjects();\n    let name = getProjects().map(element => element.name);\n    let index = name.findIndex(name => name === evt.target.dataset.target);\n    store.splice(index, 1);\n    window.localStorage.setItem(storeKey, JSON.stringify(store));\n  };\n\n  const deleteTodoItem = (projectId, index) => {\n    const project = getProjectById(projectId);\n    project.todos.splice(index, 1);\n    updateProject(projectId, project);\n  };\n\n  const existsProject = name => {\n    const projects = getProjects();\n    for (const project of projects) {\n      if (project.name.toLowerCase().trim() === name.toLowerCase().trim()) {\n        return true;\n      }\n    }\n    return false;\n  };\n\n  const updateProject = (id, project) => {\n    const projects = getProjects();\n    let i = -1;\n    projects.forEach((p, index) => {\n      if (id === p.id) {\n        i = index;\n      }\n    });\n    projects.splice(i, 1, project);\n    window.localStorage.setItem(storeKey, JSON.stringify(projects));\n  };\n\n  const updateTodoItem = (projectId, index, todoItem) => {\n    const project = getProjectById(projectId);\n    project.todos.splice(index, 1, todoItem);\n    updateProject(projectId, project);\n  };\n\n  const editProject = (projectId, projectName) => {\n    const project = getProjectById(projectId);\n    project.name = projectName;\n    updateProject(projectId, project);\n  };\n\n  return {\n    addProject,\n    existsProject,\n    getProjectById,\n    getProjects,\n    addTodoItem,\n    deleteProject,\n    deleteTodoItem,\n    editProject,\n    updateProject,\n    updateTodoItem,\n    getTodoItemById\n  };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (storage);\n\n\n//# sourceURL=webpack:///./src/components/storage.js?");

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/index.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _reset_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reset.css */ \"./src/reset.css\");\n/* harmony import */ var _reset_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reset_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.css */ \"./src/index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/home */ \"./src/components/home.js\");\n/* harmony import */ var _components_createProject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/createProject */ \"./src/components/createProject.js\");\n/* harmony import */ var _components_createDom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/createDom */ \"./src/components/createDom.js\");\n/* harmony import */ var _components_show__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/show */ \"./src/components/show.js\");\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/reset.css":
/*!***********************!*\
  !*** ./src/reset.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/reset.css?");

/***/ }),

/***/ "./src/utility.js":
/*!************************!*\
  !*** ./src/utility.js ***!
  \************************/
/*! exports provided: createHtmlElement, updateHtmlElement, createHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createHtmlElement\", function() { return createHtmlElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateHtmlElement\", function() { return updateHtmlElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createHeader\", function() { return createHeader; });\nfunction createHtmlElement(\n  type,\n  attributes = {},\n  innerText = null,\n  innerHTML = null\n) {\n  const ele = document.createElement(type);\n  for (const prop in attributes) {\n    ele.setAttribute(prop, attributes[prop]);\n  }\n\n  if (innerText) ele.innerText = innerText;\n\n  if (innerHTML) ele.innerHTML = innerHTML;\n\n  return ele;\n}\n\nfunction updateHtmlElement(ele, attributes = {}, innerText = null) {\n  for (const prop in attributes) {\n    ele.setAttribute(prop, attributes[prop]);\n  }\n  if (innerText) ele.innerText = innerText;\n}\n\nconst createHeader = (content, header2) => {\n  for (const input in content) {\n    if (input.value === null) {\n      continue;\n    }\n    header2.innerHTML = 'Add Todo';\n  }\n  return header2;\n};\n\n\n//# sourceURL=webpack:///./src/utility.js?");

/***/ })

/******/ });