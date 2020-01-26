import store from './storage';
import { createHtmlElement } from '../utility';
import Todo from '../components/createProject';
import { renderHome } from './home';

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

          const header5 = document.createElement('h5');
          const span1 = document.createElement('span');
          span1.innerHTML = `Title: ${todo.title}`;
          header5.appendChild(span1);

          const descriptionDiv = document.createElement('p');
          const span2 = document.createElement('span');
          span2.innerHTML = `Description: ${todo.description}`;
          descriptionDiv.appendChild(span2);

          const dateTimeDiv = createHtmlElement('div', {}, null, null);
          const span3 = document.createElement('span');
          span3.innerHTML = `Due date: ${todo.dueDate}`;
          dateTimeDiv.appendChild(span3);

          const priorityDiv = createHtmlElement('div', {}, null, null);
          const span4 = document.createElement('span');
          span4.innerHTML = `Priority: ${todo.priority}`;
          priorityDiv.appendChild(span4);

          const categoryDiv = createHtmlElement('div', {}, null, null);
          const span5 = document.createElement('span');
          span5.innerHTML = `Category: ${todo.category}`;
          categoryDiv.appendChild(span5);

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
    const {
      title,
      description,
      dueDate,
      priority,
      category
    } = store.getTodoItemById(projectId, index);

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

    for (const name of ['title', 'description']) {
      const inputElement = document.createElement('input');
      inputElement.setAttribute('type', 'text');
      inputElement.setAttribute('name', name);
      inputElement.setAttribute('placeholder', name);
      inputElement.setAttribute('class', name);
      inputElement.value = name === 'title' ? title : description;
      form.append(inputElement);
    }
    const dueDateElement = document.createElement('input');
    dueDateElement.setAttribute('type', 'date');
    dueDateElement.setAttribute('name', 'dueDate');
    dueDateElement.setAttribute('class', 'dueDate');
    dueDateElement.value = dueDate;

    const priorityArr = ['urgent', 'Important', 'Normal'];
    const select = document.createElement('select');
    select.setAttribute('class', 'select');
    for (const choice of priorityArr) {
      const option = document.createElement('option');
      option.setAttribute('type', 'text');
      option.setAttribute('name', 'select');
      option.setAttribute('class', choice);
      option.innerHTML = choice;
      if (choice === priority) {
        option.setAttribute('selected', 'selected');
      }
      option.value = choice;
      select.appendChild(option);
    }

    const checkListElement = document.createElement('input');
    checkListElement.setAttribute('type', 'checkbox');
    checkListElement.setAttribute('name', 'checklist');
    checkListElement.setAttribute('class', 'checklist');

    const categoryElement = document.createElement('input');
    categoryElement.setAttribute('type', 'text');
    categoryElement.setAttribute('name', 'category');
    categoryElement.setAttribute('class', 'category');
    categoryElement.value = category;
    form.append(dueDateElement, select, categoryElement);

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

    if (!title || !description || !dueDate || !priority || !category) {
      alert('Please check, a required field(s) are empty');
    } else {
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
    // decoupling should be done here
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
