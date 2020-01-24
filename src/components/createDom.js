import Todo from './createProject';
import store from './storage';
import { createHtmlElement, createHeader } from '../utility';

const createTask = (() => {
  const names = ['title', 'description', 'dueDate', 'priority', 'category'];
  let form;
  let select;
  const render = param => {
    const root = document.querySelector('#root');
    const row = createHtmlElement('div', { class: 'row', id: 'create' });
    const container = createHtmlElement('div', { class: 'container' });
    const wrapper = createHtmlElement('div', { class: 'form-wrapper' });
    const header2 = document.createElement('h2');

    form = document.createElement('form');
    form.classList.add('form');
    const namesArr = ['title', 'description'];
    for (const name of namesArr) {
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('name', name);
      input.setAttribute('placeholder', name);
      input.setAttribute('class', `input ${name}`);
      form.append(input);
    }
    const dueDate = document.createElement('input');
    dueDate.setAttribute('type', 'date');
    dueDate.setAttribute('name', 'dueDate');
    dueDate.setAttribute('class', 'dueDate');

    const priorityArr = ['urgent', 'Important', 'Normal'];
    select = document.createElement('select');
    select.setAttribute('name', 'select');
    select.setAttribute('class', 'select');
    for (const priority of priorityArr) {
      const option = document.createElement('option');
      option.setAttribute('type', 'text');
      option.setAttribute('class', 'input');
      option.innerHTML = priority;
      select.append(option);
    }

    const category = document.createElement('input');
    category.setAttribute('type', 'text');
    category.setAttribute('name', 'category');
    category.setAttribute('class', 'category input');

    const submitButton = document.createElement('div');
    submitButton.setAttribute('value', 'create a todo');
    submitButton.setAttribute('data-target', 'show');
    submitButton.setAttribute('class', 'createTodo input');
    submitButton.setAttribute('type', 'submit');

    submitButton.innerText = 'submit';
    submitButton.addEventListener('click', createProject);

    const content = form.querySelectorAll('.input');
    const header = createHeader(content, header2);

    root.append(row);
    row.append(container);
    container.append(wrapper);
    form.append(dueDate);
    form.append(select);
    form.append(category);
    wrapper.append(header, form, submitButton);

    form.querySelector('.category').value = param;
  };

  const createProject = evt => {
    evt.preventDefault();
    const title = form.querySelector('.title').value;
    const description = form.querySelector('.description').value;
    const dueDate = form.querySelector('.dueDate').value;
    const priority = form.querySelector('.select').value;
    const category = form.querySelector('.category').value;

    if (!title || !description || !dueDate || !priority || !category) {
      alert('Please check, a required field(s) are empty');
    } else {
      const todo = Todo(title, description, dueDate, priority, category);

      store.addTodoItem(todo.toJson().category, todo.toJson());

      let currentPage = evt.target.getAttribute('data-target');
      document.querySelector('.active').classList.remove('active');
      document.getElementById(currentPage).classList.add('active');

      import('./show').then(module => {
        if (evt.target.classList.contains('createTodo')) {
          module.default.render(todo.toJson().category);
        }
      });
    }

    // decoupling should be done here
  };

  return {
    render
  };
})();

export default createTask;
