import db from '../components/storage';
import { Project } from './createComponent/createProject';
import store from './storage';
import { createHtmlElement, updateHtmlElement } from '../utility';
import storage from '../components/storage';

const rightPanel = createHtmlElement('div', { class: 'rightPanel' });
const addProjectButton = createHtmlElement(
  'button',
  { class: 'createProject' },
  'Add Project'
);
let submitProjectButton;
let textfield;

export const renderHome = () => {
  const root = document.querySelector('#root');
  const row = createHtmlElement('div', {
    class: 'row row1 active',
    id: 'home'
  });

  const container = createHtmlElement('div', { class: 'container' });
  const homeWrapper = createHtmlElement('div', { class: 'homeWrapper' });

  const leftPanel = createHtmlElement('div', { class: 'leftPanel' });

  let projectButton;

  root.append(row);
  row.append(container);
  container.append(homeWrapper);

  let projects = db.getProjects();

  projects.forEach(project => {
    projectButton = createHtmlElement(
      'button',
      {
        'data-target': 'show',
        'data-projectid': project.id,
        class: 'buttonProject'
      },
      project.name
    );

    const createTodo = createHtmlElement(
      'button',
      {
        type: 'submit',
        value: 'create a todo',
        'data-target': 'create',
        'data-name': project.name
      },
      'Add Todo'
    );

    const editButton = createHtmlElement(
      'button',
      {
        class: 'editButton',
        'data-id': project.id
      },
      'Edit'
    );

    const deleteButton = createHtmlElement(
      'button',
      {
        class: 'deleteButton',
        'data-target': project.name
      },
      'Delete'
    );

    const wrapper = createHtmlElement('div', {
      class: 'wrapper'
    });

    leftPanel.append(wrapper);
    wrapper.append(projectButton);
    wrapper.append(createTodo);
    wrapper.append(editButton);
    wrapper.append(deleteButton);
    projectButton.addEventListener('click', render);
    createTodo.addEventListener('click', navigation);
    deleteButton.addEventListener('click', evt => {
      store.deleteProject(evt);
      renderHome();
    });
    editButton.addEventListener('click', () => showEditForm(project));
  });

  homeWrapper.append(leftPanel);
  leftPanel.append(addProjectButton);
  homeWrapper.append(rightPanel);

  addProjectButton.addEventListener('click', showTextField);
};

const showEditForm = project => {
  const projectNameTextField = 'project-name';
  const updateButtonId = 'update-btn';
  let form = rightPanel.querySelector('#edit-project-form');
  if (form) {
    updateHtmlElement(form.querySelector(`#${projectNameTextField}`), {
      value: project.name
    });
    updateHtmlElement(form.querySelector(`#${updateButtonId}`), {
      'data-projectId': project.id
    });
  } else {
    form = createHtmlElement('form', {
      class: 'showEditForm',
      id: 'edit-project-form'
    });

    form.append(
      createHtmlElement('input', {
        id: projectNameTextField,
        value: project.name
      })
    );

    form.append(
      createHtmlElement(
        'button',
        {
          id: updateButtonId,
          'data-projectId': project.id
        },
        'update'
      )
    );

    rightPanel.append(form);
  }

  form
    .querySelector(`#${updateButtonId}`)
    .addEventListener('click', updateProject);
};

const updateProject = evt => {
  evt.preventDefault();
  const projectId = evt.target.dataset.projectid;
  const form = document.querySelector('#edit-project-form');
  const newProjectName = form.querySelector('#project-name').value;

  if (!newProjectName || newProjectName === '') {
    alert('please enter a valid project name');
    return;
  }

  const project = store.getProjectById(projectId);

  project.name = newProjectName;
  store.updateProject(projectId, project);
  renderHome();
  location.reload();
  form.parentNode.removeChild(form);
};

function navigation(evt) {
  const param = evt.target.dataset.name;
  evt.preventDefault();
  import('./createComponent/createDom')
    .then(module => {
      const create = module.default;
      create.render(param);
    })
    .then(() => {
      let currentPage = evt.target.getAttribute('data-target');
      document.querySelector('.active').classList.remove('active');
      document.getElementById(currentPage).classList.add('active');
    });
}

function render(evt) {
  import('./show')
    .then(module => {
      module.default.render(evt.target.innerText);
    })
    .then(() => {
      let currentPage = evt.target.getAttribute('data-target');
      document.querySelector('.active').classList.remove('active');
      document.getElementById(currentPage).classList.add('active');
    });
}

const showTextField = evt => {
  const form = createHtmlElement('form', { class: 'projectForm' });
  textfield = createHtmlElement('input', { id: 'projectInput' });
  submitProjectButton = createHtmlElement(
    'button',
    {
      type: 'submit',
      value: 'Create Project'
    },
    'submit'
  );
  form.append(textfield);
  form.append(submitProjectButton);
  rightPanel.append(form);
  submitProjectButton.addEventListener('click', addProjects);
  addProjectButton.hidden = true;
};

const addProjects = evt => {
  evt.preventDefault();
  const text = document.getElementById('projectInput').value;

  if (!text || text === '') {
    window.alert('Please enter a project title');
    return;
  }

  const name = text.trim();

  const exists = db.existsProject(name);

  if (exists) {
    window.alert(`Project name: ${name} is already taken`);
    return;
  }

  const project = new Project(text);
  db.addProject(project);

  addProjectButton.hidden = false;
  submitProjectButton.hidden = true;
  textfield.hidden = true;
  renderHome();
  location.reload();
};

renderHome();
