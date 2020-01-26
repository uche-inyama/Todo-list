import uuid from 'uuid/v4';

const Todo = (title, description, dueDate, priority, category) => {
  // const getTitle = () => title;
  // const getDescription = () => description;
  // const getDueDate = () => dueDate;
  // const getPriority = () => priority;
  // const getCategory = () => category;

  function toJson() {
    return {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      category: category
    };
  }

  return {
    title,
    description,
    dueDate,
    priority,
    category,
    toJson
  };
};

export class Project {
  constructor(name) {
    this.id = uuid();
    this.name = name;
    this.todos = [];
  }
}

export default Todo;
