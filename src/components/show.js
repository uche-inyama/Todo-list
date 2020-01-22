import store from './storage.js';
import { createHtmlElement, getObjectFromForm } from '../utility';
import Todo from '../components/createComponent/createProject';
import { renderHome } from './Home';

const show = (() => {
  const root = document.querySelector('#root');
  const row = createHtmlElement('div', {
    class: 'row',
    id: 'show'
  });

  const container = document.createElement('div');
  let showWrapper = document.createElement('div');
  container.classList.add('container');
  showWrapper.classList.add('showWrapper');
  let containerDiv;

  let form;

  const inputNames = [
    'title',
    'description',
    'dueDate',
    'priority',
    'category'
  ];

  root.append(row);
  row.append(container);
  container.append(showWrapper);

  const render = project => {
    if (containerDiv) {
      containerDiv.parentNode.removeChild(containerDiv);
    }
    containerDiv = document.createElement('div');
    containerDiv.classList.add('containerDiv');

    const header3 = document.createElement('h1');
    header3.setAttribute('class', 'header3');
    containerDiv.append(header3);

    store.getProjects().forEach(element => {
      if (element.name === project) {
        header3.innerText = `${project} Todos `;
        element.todos.forEach((todo, index) => {
          const containerTodo = document.createElement('div');
          containerTodo.classList.add('containerTodo');
          const header5 = createHtmlElement('h5', {}, null, todo.title);
          const descriptionDiv = createHtmlElement(
            'p',
            {},
            null,
            todo.description
          );
          const dateTimeDiv = createHtmlElement('div', {}, null, todo.dueDate);
          const priorityDiv = createHtmlElement('div', {}, null, todo.priority);
          const categoryDiv = createHtmlElement('div', {}, null, todo.category);

          const deleteButton = createHtmlElement(
            'button',
            {
              'data-todoId': index,
              'data-projectId': element.id
            },
            'Delete'
          );

          const editButton = createHtmlElement(
            'button',
            {
              'data-todoId': index,
              'data-projectId': element.id,
              'data-target': 'updateTodo'
            },
            'Edit'
          );

          containerTodo.append(
            header5,
            descriptionDiv,
            dateTimeDiv,
            priorityDiv,
            categoryDiv,
            editButton,
            deleteButton
          );
          containerDiv.appendChild(containerTodo);

          deleteButton.addEventListener('click', deleteTodo);
          editButton.addEventListener('click', showEditForm);

          showWrapper.appendChild(containerDiv);
        });
      }
    });
  };

  function showEditForm(evt) {
    const index = evt.target.dataset.todoid;
    const projectId = evt.target.dataset.projectid;
    const header2 = document.createElement('h2');
    header2.setAttribute('class', 'header2');
    header2.innerText = 'Update Todo';
    const todo = store.getTodoItemById(projectId, index);

    const names = {
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      priority: todo.priority,
      checklist: todo.checklist,
      category: todo.category
    };

    const root = document.querySelector('#root');
    const row = createHtmlElement('div', { class: 'row', id: 'updateTodo' });
    const container = createHtmlElement('div', { class: 'container' });
    const wrapper = createHtmlElement('div', { class: 'form-wrapper' });

    const btn = createHtmlElement('input', {
      type: 'submit',
      value: 'update todo',
      'data-target': 'show',
      'data-todoid': index,
      'data-projectid': projectId,
      class: 'updateTodo'
    });

    form = createHtmlElement('form');

    root.append(row);
    row.append(container);
    container.append(wrapper);
    wrapper.append(header2, form);

    const newNames = ['title', 'description'];
    for (const name of newNames) {
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('name', name);
      input.setAttribute('placeholder', name);
      input.setAttribute('class', name);
      form.append(input);
    }
    const dueDate = document.createElement('input');
    dueDate.setAttribute('type', 'date');
    dueDate.setAttribute('name', 'dueDate');
    dueDate.setAttribute('class', 'dueDate');

    const priorityArr = ['select priority', 'urgent', 'Important', 'Normal'];
    const select = document.createElement('select');
    select.setAttribute('class', 'select');
    for (const priority of priorityArr) {
      const option = document.createElement('option');
      option.setAttribute('type', 'text');
      option.setAttribute('name', 'select');
      option.setAttribute('class', priority);
      option.innerHTML = priority;
      select.appendChild(option);
    }

    const checkList = document.createElement('input');
    checkList.setAttribute('type', 'checkbox');
    checkList.setAttribute('name', 'checklist');
    checkList.setAttribute('class', 'checklist');

    const category = document.createElement('input');
    category.setAttribute('type', 'text');
    category.setAttribute('name', 'category');
    category.setAttribute('class', 'category');

    form.append(dueDate, select, category);

    document.querySelector('.title').value = names.title;
    document.querySelector('.description').value = names.description;
    document.querySelector('.dueDate').value = names.dueDate;
    document.querySelector('.category').value = names.category;

    form.append(btn);

    btn.addEventListener('click', updateTodo);

    let currentPage = evt.target.getAttribute('data-target');
    document.querySelector('.active').classList.remove('active');
    document.getElementById(currentPage).classList.add('active');
  }

  function updateTodo(evt) {
    evt.preventDefault();

    const title = form.querySelector('.title').value;
    const description = form.querySelector('.description').value;
    const dueDate = form.querySelector('.dueDate').value;
    const priority = form.querySelector('.select').value;
    const category = form.querySelector('.category').value;
    console.log(form.querySelector('.select'));

    // decoupling should be done here
    const todo = Todo(title, description, dueDate, priority, category);

    store.updateTodoItem(
      evt.target.dataset.projectid,
      evt.target.dataset.todoid,
      todo.toJson()
    );

    let currentPage = evt.target.getAttribute('data-target');
    document.querySelector('.active').classList.remove('active');
    document.getElementById(currentPage).classList.add('active');
    renderHome();
    location.reload();
  }

  function deleteTodo(evt) {
    const { projectid, todoid } = evt.target.dataset;
    const project = store.getProjectById(projectid);
    store.deleteTodoItem(projectid, todoid);
    render(project.name);
  }

  return {
    render,
    root,
    container
  };
})();

export default show;
