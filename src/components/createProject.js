import uuid from 'uuid/v4';

const Todo = (title, description, dueDate, priority, category) => {
  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getCategory = () => category;

  function toJson() {
    return {
      title: getTitle(),
      description: getDescription(),
      dueDate: getDueDate(),
      priority: getPriority(),
      category: getCategory()
    };
  }

  return {
    getTitle,
    getDescription,
    getDueDate,
    getPriority,
    getCategory,
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
